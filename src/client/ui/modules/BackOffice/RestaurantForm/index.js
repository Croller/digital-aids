/* eslint-disable prefer-destructuring */
import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { rules, collectError } from 'client/utils/validatorRules';
import { showMessage } from 'client/ui/components/_ui/Message';
import { dataToForm, dataToApi, model } from 'client/store/backOffice/mapper/restaurant';
import { getUrl, loadFile } from 'client/utils/common';
import { update } from 'client/store/backOffice';
import {
  MenuSvg,
  InfoCircleSvg,
  ChefHeadSvg,
  AlertCircleSvg,
} from 'client/assets/images';
import { IconText } from 'client/ui/components/_block/IconText';
import {
  Wrapper,
  NavbarStyled,
  FormStyled,
  Form2Col,
  FormCol,
  FormItemStyled,
  FormItemSubmit, Save,
  InputStyled,
  // InputMaskStyled,
  SelectStyled, OptionStyled,
  NavWrapper, NavButton,
  FormUploader,
  UploaderLogo,
  UploaderPhotos,
} from './styled';

const NAV_CONFIG = [
  {
    key: 'menu',
    icon: (<MenuSvg />),
    path: '',
  },
  {
    key: 'specialDeals',
    icon: (<InfoCircleSvg />),
    path: '',
  },
  {
    key: 'foodtips',
    icon: (<ChefHeadSvg />),
    path: '',
  },
];

const Restaurant = memo(() => {
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
  const [isChange, setIsChnage] = useState(false);
  const [loadFiles, setLoadFiles] = useState(true);
  const [formData, setFormData] = useState(null);
  const [form] = FormStyled.useForm();

  const initValue = async () => {
    let data = { ...model };
    if (params.restaurant !== 'new' && restaurants) {
      data = restaurants.find(rest => rest.id === params.restaurant);
    }
    setFormData(dataToForm({ ...data }));
    if (data.images && data.images.length > 0) {
      const images = await Promise.all(data.images.map(async (uuid, i) => {
        const path = i === 0 ? 'logo' : 'photos';
        const file = await loadFile(`${getUrl()}/static/restaurants/${path}/${uuid}.png`, uuid);
        return file;
      }));
      setFormData(dataToForm({ ...data, images }));
    }
    setLoadFiles(false);
  };

  const handleRoute = (key) => {
    if (key === 'delete') {
      history.goBack();
      return;
    }
    history.push(key);
  };

  const handleFinish = (values) => {
    let data = { ...model };
    if (params.restaurant !== 'new' && restaurants) {
      data = restaurants.find(rest => rest.id === params.restaurant);
    }
    const edited = dataToApi({ ...formData, ...values }, data);
    
    rootDispatch(update({ name: 'data_restaurants', data: edited }));
  };

  const handleFinishFailed = ({ errorFields }) => {
    collectError(errorFields);
    showMessage({
      type: 'error',
      content: t('common.form.error.notFilled'),
    });
  };

  const handleValuesChange = () => {
    setIsChnage(true);
  };

  const handleUpload = (key, files) => {
    let list = formData.images || [''];
    if (key === 'logo') {
      // eslint-disable-next-line prefer-destructuring
      list[0] = files[0] || null;
    }
    if (key === 'photos') {
      list = [list[0], ...files];
    }
    setFormData({ ...formData, images: list });
    setIsChnage(true);
    // deteled && rootDispatch(deleteFile({ path: `/restaurant/${key}/${deteled.uuid}.png` }));
  };

  useEffect(() => {
    window.prerenderReady = true;
    initValue();
  }, []);

  useEffect(() => {
    if (status) {
      if (status === 'created') {
        const rest = restaurants.slice(-1)[0];
        history.push(rest.id);
      }
      showMessage({ type: 'success', content: t(`common.words.${status}`) });
    }
  }, [status]);

  return formData && (
    <Wrapper>
      <NavbarStyled
        settings={{ delete: params.restautant !== 'new' }}
        onChange={handleRoute}
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
                placeholder={t('common.form.text')}
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
                placeholder={t('common.form.select')}
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
                placeholder={t('common.form.text')}
              />
            </FormItemStyled>
            <FormItemStyled
              label={t('common.words.phone')}
              name="phone"
              required
              rules={rule.text}
            >
              <InputStyled
                placeholder={t('common.form.text')}
              />
              {/* <SelectStyled
                mode="tags"
                tokenSeparators={[',']}
                placeholder={t('common.form.select')}
              >
                <OptionStyled value="lucy">Lucy</OptionStyled>
                <OptionStyled value="2">Lucy</OptionStyled>
                <OptionStyled value="3">Lucy</OptionStyled>
              </SelectStyled> */}
              {/* <InputMaskStyled
                mask="111 1111 1111 1111"
                placeholder={t('common.form.text')}
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
                placeholder={t('common.form.select')}
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
                placeholder={t('common.form.select')}
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
                placeholder={t('common.form.select')}
              >
                {dictionary && (dictionary.currency || []).map(({ id, symbol }, i) => (
                  <OptionStyled key={`_currency_${i + 1}`} value={id}>{`${id} ${symbol}`}</OptionStyled>
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
                placeholder={t('common.form.floatExample')}
              />
            </FormItemStyled>
            <FormItemStyled
              label={t('common.words.opinion')}
              name="opinion"
              required
              rules={rule.email}
            >
              <InputStyled
                placeholder={t('common.form.text')}
              />
            </FormItemStyled>
            
            {/* // socials */}
            <FormItemStyled
              label="TheFork"
              name="socials.thefork.url"
            >
              <InputStyled
                placeholder={t('common.form.link')}
              />
            </FormItemStyled>
            <FormItemStyled
              label="TripAdviser"
              name="socials.tripadviser.url"
            >
              <InputStyled
                placeholder={t('common.form.link')}
              />
            </FormItemStyled>
            <FormItemStyled
              label="Facebook"
              name="socials.facebook.url"
            >
              <InputStyled
                placeholder={t('common.form.link')}
              />
            </FormItemStyled>
            <FormItemStyled
              label="Instagram"
              name="socials.instagram.url"
            >
              <InputStyled
                placeholder={t('common.form.link')}
              />
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
              rules={rule.text}
            >
              <SelectStyled
                showSearch
                placeholder={t('common.form.select')}
              >
                {dictionary && (dictionary.language || []).filter(f => f.id !== 'en').map(({ id }, i) => (
                  <OptionStyled key={`_language_${i + 1}`} value={id}>{id}</OptionStyled>
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
                placeholder={t('common.form.select')}
              >
                {dictionary && (dictionary.language || []).map(({ id }, i) => (
                  <OptionStyled key={`_sub_language_${i + 1}`} value={id}>{id}</OptionStyled>
                ))}
              </SelectStyled>
            </FormItemStyled>
            <FormItemStyled
              label={t('common.words.workingTime')}
              name="work_time"
              required
              rules={rule.text}
            >
              <InputStyled
                placeholder={t('common.form.text')}
              />
            </FormItemStyled>
            {params.restaurant !== 'new' && (
              <NavWrapper>
                {NAV_CONFIG.map(({ key, icon, path }) => (
                  <NavButton key={key} onClick={() => handleRoute(path)}>
                    <IconText
                      icon={icon}
                      text={t(`common.words.${key}`)}
                    />
                  </NavButton>
                ))}
              </NavWrapper>
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
                      files={formData.images[0] ? [formData.images[0]] : []}
                      onUpload={(files, deleted) => handleUpload('logo', files, deleted)}
                      onStatus={showMessage}
                      max={1}
                    />
                  </FormItemStyled>
                  <FormItemStyled
                    label={t('common.words.photos')}
                    name="photos"
                  >
                    <UploaderPhotos
                      key="photos"
                      files={formData.images.reduce((arr, it, i) => (i === 0 ? arr : [...arr, it]), [])}
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
    </Wrapper>
  );
});

export default Restaurant;
