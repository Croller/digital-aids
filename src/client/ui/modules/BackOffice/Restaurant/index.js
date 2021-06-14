/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { rules, collectError } from 'client/utils/validatorRules';
import { showMessage } from 'client/ui/components/_ui/Message';
import { dataToForm, dataToApi, model } from 'client/store/backOffice/mapper/restaurant';
import { update, deleteFiles } from 'client/store/backOffice';
import { AlertCircleSvg } from 'client/assets/images';
import { getCoordsByAddress } from 'client/providers/common';
import { useDebounce } from 'client/ui/components/_base/Debounce';
import { Marker } from 'google-maps-react';
import { ImageChange } from 'client/ui/components/_block/Modal/ImageChange';
import { useModal } from 'react-modal-hook';
import { ImgCrop } from 'client/ui/components/_ui/ImgCrop';
import {
  getUrl,
  getDictionaryItem,
  loadFile,
  imageResize,
} from 'client/utils/common';
import {
  RestaurantWrapper,
  NavBarStyled,
  FormStyled,
  Form2Col,
  FormCol,
  FormItemStyled,
  FormItemSubmit, Save,
  InputStyled,
  SelectStyled, OptionStyled, UpperCase,
  NavItemStyled,
  FormUploader,
  UploaderLogo,
  UploaderPhotos,
  AddressItemsWrapper,
  AddressList,
  AddressItem,
  MapStyled,
  Separator,
  FormRange, RadioGroup, RadioButton,
  InputMaskStyled,
} from './styled';

const CROP_CONFIG = {
  logo: {
    width: 400,
    height: 220,
    x: 0,
    y: 0, 
  },
  photos: {
    width: 500,
    height: 240,
    x: 0,
    y: 0, 
  },
};

const Restaurant = () => {
  const {
    user,
    user: { info: { language, roles } },
    backOffice: { 
      restaurants,
      dictionary,
      status,
      loading,
    },
  } = useSelector(s => s);

  const [t] = useTranslation();
  const rule = rules(t);
  const params = useParams();
  const history = useHistory();
  const rootDispatch = useDispatch();
  const [isChange, setIsChange] = useState(false);
  const [loadFiles, setLoadFiles] = useState(true);
  const [formData, setFormData] = useState(null);
  const [deletedFiles, setDeletedFiles] = useState([]);
  const [addressStr, setAddressStr] = useState(null);
  const [addressResults, setAddressResults] = useState(null);
  const debouceSearch = useDebounce(addressStr, 500);
  const [form] = FormStyled.useForm();
  const [eventCrop, setEventCrop] = useState(null);
  const [fileOriginal, setFileOriginal] = useState([]);
  const [showCrop, hideCrop] = useModal(() => (
    <ImageChange
      title={t('backOffice.confirmModal.crop')}
      textOk={t('common.words.apply')}
      textCancel={t('common.words.no')}
      onCancel={() => {
        hideCrop();
        setFormData(eventCrop.paramsBackup);
        setEventCrop(null);
      }}
      onClose={() => {
        hideCrop();
        setFormData(eventCrop.paramsBackup);
        setEventCrop(null);
      }}
      onOk={() => {
        hideCrop();
        setFormData(eventCrop.params);
        setEventCrop(null);
      }}
    >
      {eventCrop && (
        <ImgCrop
          locked
          source={eventCrop.params.images[0]}
          onComplete={handleCrop}
          setting={CROP_CONFIG[eventCrop.type]}
        />
      )}
    </ImageChange>
  ), [eventCrop]);

  const setData = (obj) => {
    setFormData(obj);
    form.setFieldsValue(obj);
  };

  const initValue = () => {
    let data = { ...model };
    if (params.restaurant !== 'new' && restaurants) {
      data = restaurants.find(f => f.id === params.restaurant);
    }

    setData(dataToForm({ ...data, images: [] }));
    if (data.images && data.images.length > 0) {
      Promise.all(data.images.map(async (uuid, i) => {
        const path = i === 0 ? 'logo' : 'photos';
        const file = await loadFile(`${getUrl()}/static/restaurants/${path}/${uuid}.png`, uuid);
        return file;
      })).then(images => setData(dataToForm({ ...data, images })));
    }
    setLoadFiles(false);
  };

  const getFiles = (key) => {
    if (!formData.images) return [];
    if (key === 'logo') {
      return formData.images[0] ? [formData.images[0]] : [];
    } 
    return formData.images.slice(1);
  };

  const getMapProps = () => ({
    center: {
      lat: formData.lat,
      lng: formData.lng,
    },
    zoom: !formData.lat && !formData.lng ? 1 : 15,
  }); 

  const handleRoute = (key) => {
    history.push(key);
  };

  const handleEvent = (obj) => {
    rootDispatch(update({ name: 'data_restaurants', data: { id: params.restaurant, ...obj } }));
    handleRoute('/back-office/restaurants');
  };

  const handleFinish = (values) => {
    const edited = dataToApi({ ...formData, ...values }, { ...model, id: params.restaurant !== 'new' ? params.restaurant : null });
    rootDispatch(update({ name: 'data_restaurants', data: edited }));
    deletedFiles && rootDispatch(deleteFiles({ data: deletedFiles }));
    setIsChange(false);
  };

  const handleFinishFailed = ({ errorFields }) => {
    collectError(errorFields);
    showMessage({
      type: 'error',
      content: t('common.form.error.notFilled'),
    });
  };

  const handleValuesChange = async (values) => {
    console.log('values - ', { ...formData, ...values });
    if (!values) return;
    const edited = { ...formData, ...values };

    if (edited.main_language) {
      edited.sub_languages = edited.sub_languages.filter(f => f !== edited.main_language);
    }
    if (edited.main_language !== 'en' && !edited.sub_languages.includes('en')) {
      edited.sub_languages = ['en', ...edited.sub_languages];
    }
    if (edited.address) {
      setAddressStr(edited.address);
    }
    if (Object.keys(edited).length > 0) {
      const obj = {
        ...formData,
        ...edited,
      };
      setData(obj);
    }
    setIsChange(true);
  };

  const handleUpload = (type, files, deleted = null) => {
    let list = [...formData.images || [null]];
    if (type === 'logo') {
      list[0] = deleted ? null : { ...files[0] };
    }
    if (type === 'photos') {
      list = [list[0], ...files];
    }
    if (deleted) {
      const arr = [`/restaurants/${type}/${deleted.uuid}.png`];
      if (deleted.uuid.indexOf('-thumbnail') > -1) {
        arr.push(`/restaurants/${type}/${deleted.uuid.replace('-thumbnail', '')}.png`);
      }
      setDeletedFiles([...(deletedFiles || []), ...arr]);
    }
    if ((type === 'photos' && list.slice(1).length > 0)) {
      setFormData({ ...formData, images: [] });
      showCrop();
      setEventCrop({
        type,
        key: 'crop',
        params: { ...formData, images: [files[files.length - 1]] },
        paramsBackup: { ...formData },
      });
    } else {
      setFormData({ ...formData, images: (list.slice(1).length > 0 || list[0] ? list : null) });
    }
    setIsChange(true);
  };

  const handleUploadEdit = (type) => {
    showCrop();
    setFormData({ ...formData, images: [] });
    setEventCrop({
      type,
      key: 'crop',
      params: { ...formData, images: formData.images.filter(f => f.uuid.indexOf('-thumbnail') === -1) },
      paramsBackup: { ...formData },
    });
    setIsChange(true);
  };

  const handleCrop = async (file, crop) => {
    const ev = { ...eventCrop };
    const cropped = await imageResize(file, crop);
    cropped.uuid = `${cropped.uuid}-thumbnail`;
    const [logo] = ev.paramsBackup;
    setFileOriginal([...fileOriginal, file]);
    ev.params.images = [...(logo ? [logo] : null), ...(ev.paramsBackup.lenght > 1 ? ev.paramsBackup.slice(1) : []), cropped];
    setEventCrop(ev);
  };

  const handleDebouceSearch = async (obj) => {
    if (debouceSearch) {
      console.log('language', { ...obj });
      const results = await getCoordsByAddress(obj);
      if (results.status === 'OK') {
        setAddressResults(results.results);
        return;
      }
    }
    setAddressResults(null);
  };

  const handleUpdateAddress = (address, geometry) => {
    setData({
      ...formData,
      address,
      lat: geometry.lat,
      lng: geometry.lng,
    });
    setAddressResults(null);
  };

  useEffect(() => {
    handleDebouceSearch({ address: debouceSearch, language });
  }, [debouceSearch]);

  useEffect(() => {
    window.prerenderReady = true;
    initValue();

    return () => {
      form.resetFields();
    };
  }, [restaurants]);

  useEffect(() => {
    if (status) {
      if (status === 'created') {
        history.goBack();
      }
      showMessage({ type: 'success', content: t(`common.words.${status}`) });
    }
  }, [status]);
  
  return formData && (
    <RestaurantWrapper>
      <NavBarStyled
        onEvent={handleEvent}
      />
      <FormStyled
        form={form}
        layout="vertical"
        initialValues={formData}
        onFinish={handleFinish}
        onValuesChange={handleValuesChange}
        onFinishFailed={handleFinishFailed}
        scrollToFirstError
      >
        <Form2Col>
          <FormCol>
            <FormItemStyled
              label={t('common.words.name')}
              name="name"
              // hasFeedback
              required
              rules={rule.text}
            >
              <InputStyled
                placeholder={t('common.form.placeholder.text')}
              />
            </FormItemStyled>
            <FormItemStyled
              label={t('common.words.cuisine')}
              name="cuisine"
              required
              rules={rule.text}
            >
              <SelectStyled
                mode="tags"
                tokenSeparators={[',']}
                placeholder={t('common.form.placeholder.number')}
              >
                {(formData.cuisine || []).map((str, i) => (
                  <OptionStyled key={`_cuisine_${i + 1}`} value={str}>{str}</OptionStyled>
                ))}
              </SelectStyled>
            </FormItemStyled>
            <FormItemStyled
              label={t('common.words.phone')}
              name="phone"
              required
              rules={rule.text}
            >
              <SelectStyled
                mode="tags"
                tokenSeparators={[',']}
                placeholder={t('common.form.placeholder.number')}
              />
            </FormItemStyled>
            <FormItemStyled
              label={t('common.words.contactPerson')}
              name="employees"
              required
              rules={rule.text}
            >
              <SelectStyled
                mode="tags"
                tokenSeparators={[',']}
                placeholder={t('common.form.placeholder.number')}
              >
                {(formData.employees || []).map((str, i) => (
                  <OptionStyled key={`_employees_${i + 1}`} value={str}>{str}</OptionStyled>
                ))}
              </SelectStyled>
            </FormItemStyled>
            <FormItemStyled
              label={t('common.words.email')}
              name="email"
              required
              rules={rule.select}
            >
              <SelectStyled
                mode="tags"
                tokenSeparators={[',']}
                placeholder={t('common.form.placeholder.number')}
              >
                {(formData.email || []).map((str, i) => (
                  <OptionStyled key={`_email_${i + 1}`} value={str}>{str}</OptionStyled>
                ))}
              </SelectStyled>
            </FormItemStyled>
            <FormItemStyled
              label={t('common.words.currency')}
              name="currency"
              required
              rules={rule.text}
            >
              <SelectStyled
                showSearch
                placeholder={t('common.form.placeholder.number')}
              >
                {dictionary && (dictionary.currency || []).map(({ id, symbol }, i) => (
                  <OptionStyled key={`_currency_${i + 1}`} value={id}>{`${id} (${symbol})`}</OptionStyled>
                ))}
              </SelectStyled>
            </FormItemStyled>
            <FormItemStyled
              label={t('common.words.avg_price')}
              name="avg_price"
              required
              rules={rule.float}
            >
              <InputStyled
                type="number"
                step="0.01"
                placeholder={t('common.form.placeholder.floatExample')}
              />
            </FormItemStyled>
            {/* <FormItemStyled
              label={t('common.words.opinion')}
              name="opinion"
              required
              rules={rule.email}
            >
              <InputStyled
                placeholder={t('common.form.placeholder.text')}
              />
            </FormItemStyled> */}
            
            {/* // socials */}
            <FormItemStyled
              label="Facebook"
              name="socials.facebook.url"
            >
              <InputStyled
                placeholder={t('common.form.placeholder.link')}
              />
            </FormItemStyled>
            <FormItemStyled
              label="Instagram"
              name="socials.instagram.url"
            >
              <InputStyled
                placeholder={t('common.form.placeholder.link')}
              />
            </FormItemStyled>
            <FormItemStyled
              label="TheFork"
              name="socials.thefork.url"
            >
              <InputStyled
                placeholder={t('common.form.placeholder.link')}
              />
            </FormItemStyled>
            {roles.includes(getDictionaryItem('admin', 'name', user.dictionary.roles, 'id')) && (
              <Form2Col>
                <FormCol>
                  <FormItemStyled
                    label={t('common.words.rate')}
                    name="socials.thefork.rate"
                  >
                    <InputStyled
                      type="number"
                      step="0.1"
                      placeholder={t('common.form.placeholder.floatExample')}
                    />
                  </FormItemStyled>
                </FormCol>
                <FormCol>
                  <FormItemStyled
                    label={t('common.words.comments')}
                    name="socials.thefork.comments"
                  >
                    <InputStyled
                      type="number"
                      step="1"
                      placeholder={t('common.form.placeholder.number')}
                    />
                  </FormItemStyled>
                </FormCol>
              </Form2Col>
            )}
            <FormItemStyled
              label="TripAdviser"
              name="socials.tripadvisor.url"
            >
              <InputStyled
                placeholder={t('common.form.placeholder.link')}
              />
            </FormItemStyled>
            {roles.includes(getDictionaryItem('admin', 'name', user.dictionary.roles, 'id')) && (
              <Form2Col>
                <FormCol>
                  <FormItemStyled
                    label={t('common.words.rate')}
                    name="socials.tripadvisor.rate"
                  >
                    <InputStyled
                      type="number"
                      step="0.1"
                      placeholder={t('common.form.placeholder.floatExample')}
                    />
                  </FormItemStyled>
                </FormCol>
                <FormCol>
                  <FormItemStyled
                    label={t('common.words.comments')}
                    name="socials.tripadvisor.comments"
                  >
                    <InputStyled
                      type="number"
                      step="1"
                      placeholder={t('common.form.placeholder.number')}
                    />
                  </FormItemStyled>
                </FormCol>
              </Form2Col>
            )}
            <FormItemStyled
              label={t('common.words.public')}
              name="is_publish"
              required
              rules={rule.bool}
            >
              <SelectStyled
                placeholder={t('common.form.placeholder.select')}
                optionFilterProp="label"
              >
                {[{ id: true, name: t('common.words.yes') }, { id: false, name: t('common.words.no') }].map(({ id, name }, i) => (
                  <OptionStyled
                    key={`_public_${i + 1}`}
                    value={id}
                    label={name}
                  >
                    {name}
                  </OptionStyled>
                ))}
              </SelectStyled>
            </FormItemStyled>
          </FormCol>
          <FormCol>
            <FormItemStyled
              label={(
                <> 
                  <AlertCircleSvg /> 
                  {t('common.words.mainLng')}
                </>
              )}
              name="main_language"
              required
              rules={rule.select}
            >
              <SelectStyled
                showSearch
                placeholder={t('common.form.placeholder.text')}
                optionFilterProp="label"
              >
                {dictionary && (dictionary.languages || []).map(({ id, name }, i) => (
                  <OptionStyled
                    key={`_language_${i + 1}`}
                    value={id}
                    label={`${name} (${id})`}
                  >
                    {`${name} (`}
                    <UpperCase>
                      {id}
                    </UpperCase>
                    )
                  </OptionStyled>
                ))}
              </SelectStyled>
            </FormItemStyled>
            <FormItemStyled
              label={t('common.words.translations')}
              name="sub_languages"
              required
              rules={rule.select}
            >
              <SelectStyled
                showSearch
                mode="multiple"
                placeholder={t('common.form.placeholder.text')}
                optionFilterProp="label"
              >
                {dictionary && (dictionary.languages.filter(f => f.id !== formData.main_language) || []).map(({ id, name }, i) => (
                  <OptionStyled
                    key={`_sub_language_${i + 1}`}
                    value={id}
                    label={`${name} (${id})`}
                  >
                    {`${name} (`}
                    <UpperCase>
                      {id}
                    </UpperCase>
                    )
                  </OptionStyled>
                ))}
              </SelectStyled>
            </FormItemStyled>
            <FormItemStyled
              label={t('common.words.workingTime')}
            >
              <FormItemStyled
                marginbottom={0}
                name="at_work.day"
              >
                <RadioGroup>
                  {dictionary && dictionary.days.map(({ id, name }) => (
                    <RadioButton key={id} value={id}>{name}</RadioButton>
                  ))}
                </RadioGroup>
              </FormItemStyled>
              <FormRange>
                <FormItemStyled
                  name={`at_work.${formData['at_work.day']}.from`}
                >
                  <InputMaskStyled mask="11:11" />
                </FormItemStyled>
                <Separator>
                  -
                </Separator>
                <FormItemStyled
                  name={`at_work.${formData['at_work.day']}.to`}
                >
                  <InputMaskStyled mask="11:11" />
                </FormItemStyled>
              </FormRange>
            </FormItemStyled>
            {params.restaurant !== 'new' && (
              <NavItemStyled onClick={handleRoute} />
            )}
            <FormItemStyled
              label={t('common.words.address')}
              name="address"
              required
              rules={rule.text}
            >
              <InputStyled
                placeholder={t('common.form.placeholder.text')}
              />
            </FormItemStyled>
            {addressResults && (
              <AddressItemsWrapper>
                <AddressList>
                  {addressResults.map(({ place_id, formatted_address, geometry: { location } }) => (
                    <AddressItem
                      key={`_addres_item_${place_id}`}
                      onClick={() => handleUpdateAddress(formatted_address, location)}
                    >
                      {formatted_address}
                    </AddressItem>
                  ))}
                </AddressList>
              </AddressItemsWrapper>
            )}
            <Form2Col>
              <FormCol>
                <FormItemStyled
                  label={t('common.words.lat')}
                  name="lat"
                >
                  <InputStyled
                    type="number"
                    step="0.0000001"
                    placeholder={t('common.form.placeholder.floatExample')}
                  />
                </FormItemStyled>
              </FormCol>
              <FormCol>
                <FormItemStyled
                  label={t('common.words.lng')}
                  name="lng"
                >
                  <InputStyled
                    type="number"
                    step="0.0000001"
                    placeholder={t('common.form.placeholder.floatExample')}
                  />
                </FormItemStyled>
              </FormCol>
            </Form2Col>
            <MapStyled
              initialCenter={getMapProps().center}
              zoom={getMapProps().zoom}
              center={getMapProps().center}
            >
              <Marker position={getMapProps().center} />
            </MapStyled>
            <FormUploader>
              {!loadFiles && (
                <>
                  <FormItemStyled
                    label={t('common.words.logo')}
                    name="logo"
                  >
                    <UploaderLogo
                      key="logo"
                      files={getFiles('logo')}
                      onUpload={(files, deleted) => handleUpload('logo', files, deleted)}
                      onStatus={showMessage}
                      onEdit={() => handleUploadEdit('logo')}
                      max={1}
                    />
                  </FormItemStyled>
                  <FormItemStyled
                    label={`${t('common.words.restaurant')} ${t('common.words.photos')}`}
                    name="photos"
                  >
                    <UploaderPhotos
                      key="photos"
                      files={getFiles()}
                      onUpload={(files, deleted) => handleUpload('photos', files, deleted)}
                      onStatus={showMessage}
                      onEdit={() => handleUploadEdit('photos')}
                      max={10}
                    />
                  </FormItemStyled>
                </>
              )}
            </FormUploader>
            
          </FormCol>
        </Form2Col>
        <FormItemSubmit>
          <Save
            htmlType="submit"
            loading={loading}
            disabled={!isChange}
          >
            {t('common.words.save')}
          </Save>
        </FormItemSubmit>
      </FormStyled>
    </RestaurantWrapper>
  );
};

export default Restaurant;
