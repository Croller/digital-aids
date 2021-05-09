/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { rules, collectError } from 'client/utils/validatorRules';
import { showMessage } from 'client/ui/components/_ui/Message';
import { dataToForm, dataToApi, model } from 'client/store/backOffice/mapper/restaurant';
import { getUrl, loadFile } from 'client/utils/common';
import { update, deleteFiles } from 'client/store/backOffice';
import { AlertCircleSvg } from 'client/assets/images';
import { getCoordsByAddress } from 'client/providers/common';
import {
  RestaurantWrapper,
  NavBarStyled,
  FormStyled,
  Form2Col,
  FormCol,
  FormItemStyled,
  FormItemSubmit, Save,
  InputStyled,
  // InputMaskStyled,
  SelectStyled, OptionStyled, UpperCase,
  NavItemStyled,
  FormUploader,
  UploaderLogo,
  UploaderPhotos,
} from './styled';

const Restaurant = () => {
  const {
    restaurants,
    dictionary,
    status,
    loading,
  } = useSelector(store => store.backOffice);
  const [t] = useTranslation();
  const rule = rules(t);
  const params = useParams();
  const history = useHistory();
  const rootDispatch = useDispatch();
  const [isChange, setIsChange] = useState(false);
  const [loadFiles, setLoadFiles] = useState(true);
  const [formData, setFormData] = useState(null);
  const [deletedFiles, setDeletedFiles] = useState(null);

  const [form] = FormStyled.useForm();

  const initValue = () => {
    let data = { ...model };

    if (params.restaurant !== 'new' && restaurants) {
      data = restaurants.find(f => f.id === params.restaurant);
    }

    setFormData(dataToForm({ ...data, images: [] }));

    if (data.images && data.images.length > 0) {
      Promise.all(data.images.map(async (uuid, i) => {
        const path = i === 0 ? 'logo' : 'photos';
        const file = await loadFile(`${getUrl()}/static/restaurants/${path}/${uuid}.png`, uuid);
        return file;
      })).then(images => setFormData(dataToForm({ ...data, images })));
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
    console.log('values - ', values);
    if (!values) return;
    const edited = {};
    const {
      main_language,
      sub_languages,
      address,
    } = values;

    if (main_language) {
      edited.main_language = main_language;
      edited.sub_languages = formData.sub_languages.filter(f => f !== main_language);
    }
    if (sub_languages) {
      edited.sub_languages = sub_languages.some(s => s === 'en') ? sub_languages : ['en', ...sub_languages];
    }

    if (Object.keys(edited).length > 0) {
      const obj = {
        ...formData,
        ...edited,
      };
      setFormData(obj);
      form.setFieldsValue(obj);
    }

    // TODO GEOCODE
    // if (address) {
    //   const results = await getCoordsByAddress(address);
    //   console.log('results', results);
    // }
    setIsChange(true);
  };

  const handleUpload = (key, files, deleted = null) => {
    let list = formData.images || [null];
    if (key === 'logo') {
      list[0] = { ...files[0] } || null;
    }
    if (key === 'photos') {
      list = [list[0], ...files];
    }
    if (deleted && list.some(s => s && s.uuid === deleted.uuid)) {
      setDeletedFiles([...(deletedFiles || []), `/restaurants/${key}/${deleted.uuid}.png`]);
    }
    setFormData({ ...formData, images: (list.slice(1).length > 0 || list[0] ? list : null) });
    setIsChange(true);
  };

  useEffect(() => {
    window.prerenderReady = true;
    initValue();

    return () => {
      form.resetFields();
    };
  }, []);

  useEffect(() => {
    if (status) {
      if (status === 'created') {
        const { id } = restaurants.slice(-1)[0];
        history.push(id);
      }
      showMessage({ type: 'success', content: t(`common.words.${status}`) });
    }
  }, [status]);
  
  return formData && (
    <RestaurantWrapper>
      <NavBarStyled
        settings={{ delete: params.restautant !== 'new' }}
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
              label={t('common.words.address')}
              name="address"
              required
              rules={rule.text}
            >
              <InputStyled
                placeholder={t('common.form.placeholder.text')}
              />
            </FormItemStyled>
            <FormItemStyled
              label={t('common.words.phone')}
              name="phone"
              required
              rules={rule.text}
            >
              {/* <InputStyled
                placeholder={t('common.form.placeholder.text')}
              /> */}
              <SelectStyled
                mode="tags"
                tokenSeparators={[',']}
                placeholder={t('common.form.placeholder.number')}
              />
              {/* <InputMaskStyled
                mask="111 1111 1111 1111"
                placeholder={t('common.form.placeholder.text')}
              /> */}
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
              rules={rule.email}
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
            <FormItemStyled
              label={t('common.words.opinion')}
              name="opinion"
              required
              rules={rule.email}
            >
              <InputStyled
                placeholder={t('common.form.placeholder.text')}
              />
            </FormItemStyled>
            
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
            <FormItemStyled
              label="TripAdviser"
              name="socials.tripadvisor.url"
            >
              <InputStyled
                placeholder={t('common.form.placeholder.link')}
              />
            </FormItemStyled>
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
              rules={rule.text}
            >
              <SelectStyled
                showSearch
                placeholder={t('common.form.placeholder.number')}
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
              rules={rule.email}
            >
              <SelectStyled
                showSearch
                mode="multiple"
                placeholder={t('common.form.placeholder.number')}
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
              name="at_work.description"
              required
              rules={rule.text}
            >
              <InputStyled
                placeholder={t('common.form.placeholder.text')}
              />
            </FormItemStyled>
            {params.restaurant !== 'new' && (
              <NavItemStyled onClick={handleRoute} />
            )}
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
