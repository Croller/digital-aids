/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { rules, collectError } from 'client/utils/validatorRules';
import { showMessage } from 'client/ui/components/_ui/Message';
import { dataToForm, dataToApi, model } from 'client/store/backOffice/mapper/restaurant';
import { getUrl, loadFile } from 'client/utils/common';
import { create } from 'client/store/backOffice';
import { Loader } from 'client/ui/components/_base/Loader';
import { MenuSvg, InfoCircleSvg, ChefHeadSvg } from 'client/assets/images';
import { IconText } from 'client/ui/components/_ui/_etc/IconText';
import {
  Wrapper,
  TopbarStyled,
  FormStyled,
  Form2Col,
  FormCol,
  FormItemSubmit, Save,
  InputStyled,
  // InputMaskStyled,
  SelectStyled, OptionStyled,
  NavWrapper, NavButton,
  FormUploader,
  UploaderLogo,
  UploaderPhotos,
} from './styled';

const FormItem = FormStyled.Item;

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

const Restaurant = () => {
  const [t] = useTranslation();
  const rule = rules(t);
  const params = useParams();
  const history = useHistory();
  const rootDispatch = useDispatch();
  const { restaurants, loading } = useSelector(store => store.backOffice);
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
    }
  };

  const handleFinish = (values) => {
    let data = { ...model };
    if (params.restaurant !== 'new' && restaurants) {
      data = restaurants.find(rest => rest.id === params.restaurant);
    }

    const edited = dataToApi({ ...formData, ...values }, data);
    
    console.log('Restaurant data:', { ...formData, ...values });

    // rootDispatch(params.restaurant !== 'new' ? update(payload) : create(payload));
    rootDispatch(create({
      name: 'data_restaurants',
      data: dataToApi({ ...formData, ...values }, data),
    }));
  };

  const handleFinishFailed = ({ errorFields }) => {
    collectError(errorFields);
    showMessage({
      type: 'error',
      content: t('common.form.error.notFilled'),
    });
  };

  const handleValuesChange = (values) => {
    console.log('Restaurant change data:', values);
    setIsChnage(true);
  };

  const handleUpload = (key, files, deteled = null) => {
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
    // deteled && rootDispatch(deleteFile(deteled.filename));
  };

  useEffect(() => {
    window.prerenderReady = true;
    initValue();
  }, []);

  useEffect(() => {
    if (restaurants) {
      const rest = restaurants.slice(-1)[0];
      history.push(rest.id);
    }
  }, [restaurants && restaurants.length]);

  return formData && (
    <>
      {loadFiles && (<Loader />)}     
      <Wrapper>
        <TopbarStyled
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
              <FormItem
                label={t('common.words.name')}
                name="name"
                // hasFeedback
                required
                rules={rule.text}
              >
                <InputStyled
                  placeholder={t('common.form.text')}
                />
              </FormItem>
              <FormItem
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
                  <OptionStyled value="lucy">Lucy</OptionStyled>
                  <OptionStyled value="2">Lucy</OptionStyled>
                  <OptionStyled value="3">Lucy</OptionStyled>
                </SelectStyled>
              </FormItem>
              <FormItem
                label={t('common.words.address')}
                name="address"
                required
                rules={rule.text}
              >
                <InputStyled
                  placeholder={t('common.form.text')}
                />
              </FormItem>
              <FormItem
                label={t('common.words.phone')}
                name="phone"
                required
                rules={rule.text}
              >
                <SelectStyled
                  mode="tags"
                  tokenSeparators={[',']}
                  placeholder={t('common.form.select')}
                >
                  <OptionStyled value="lucy">Lucy</OptionStyled>
                  <OptionStyled value="2">Lucy</OptionStyled>
                  <OptionStyled value="3">Lucy</OptionStyled>
                </SelectStyled>
                {/* <InputMaskStyled
                  mask="1a11 1111 1111 1111"
                  placeholder={t('common.form.text')}
                /> */}
              </FormItem>
              <FormItem
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
                  <OptionStyled value="lucy">Lucy</OptionStyled>
                  <OptionStyled value="2">Lucy</OptionStyled>
                  <OptionStyled value="3">Lucy</OptionStyled>
                </SelectStyled>
              </FormItem>
              <FormItem
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
                  <OptionStyled value="lucy">Lucy</OptionStyled>
                  <OptionStyled value="2">Lucy</OptionStyled>
                  <OptionStyled value="3">Lucy</OptionStyled>
                </SelectStyled>
              </FormItem>
              <FormItem
                label={t('common.words.currency')}
                name="currency"
                required
                rules={rule.text}
              >
                <SelectStyled
                  placeholder={t('common.form.select')}
                >
                  <OptionStyled key="EUR">EUR</OptionStyled>
                  <OptionStyled value="2">Lucy</OptionStyled>
                  <OptionStyled value="3">Lucy</OptionStyled>
                </SelectStyled>
              </FormItem>
              <FormItem
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
              </FormItem>
              <FormItem
                label={t('common.words.opinion')}
                name="opinion"
                required
                rules={rule.email}
              >
                <InputStyled
                  placeholder={t('common.form.text')}
                />
              </FormItem>
              
              {/* // socials */}
              <FormItem
                label="TheFork"
                name="socials.thefork.url"
              >
                <InputStyled
                  placeholder={t('common.form.text')}
                />
              </FormItem>
              <FormItem
                label="TripAdviser"
                name="socials.tripadviser.url"
              >
                <InputStyled
                  placeholder={t('common.form.text')}
                />
              </FormItem>
              <FormItem
                label="Facebook"
                name="socials.facebook.url"
              >
                <InputStyled
                  placeholder={t('common.form.text')}
                />
              </FormItem>
              <FormItem
                label="Instagram"
                name="socials.instagram.url"
              >
                <InputStyled
                  placeholder={t('common.form.text')}
                />
              </FormItem>
            </FormCol>
            <FormCol>
              <FormItem
                label={t('common.words.mainLng')}
                name="main_language"
                required
                rules={rule.text}
              >
                <SelectStyled
                  placeholder={t('common.form.select')}
                >
                  <OptionStyled value="en">EN</OptionStyled>
                  <OptionStyled value="ru">RU</OptionStyled>
                  <OptionStyled value="3">Lucy</OptionStyled>
                </SelectStyled>
              </FormItem>
              <FormItem
                label={t('common.words.translations')}
                name="sub_languages"
                required
                rules={rule.email}
              >
                <SelectStyled
                  mode="multiple"
                  placeholder={t('common.form.select')}
                >
                  <OptionStyled value="en">EN</OptionStyled>
                  <OptionStyled value="ru">RU</OptionStyled>
                  <OptionStyled value="3">Lucy</OptionStyled>
                </SelectStyled>
              </FormItem>
              <FormItem
                label={t('common.words.workingTime')}
                name="work_time"
                required
                rules={rule.text}
              >
                <InputStyled
                  placeholder={t('common.form.text')}
                />
              </FormItem>
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
                    <FormItem
                      label={t('common.words.logo')}
                      name="logo"
                    >
                      <UploaderLogo
                        key="logo"
                        files={formData.images[0] ? [formData.images[0]] : []}
                        onUpload={(files, deleted = null) => handleUpload('logo', files, deleted)}
                        onStatus={showMessage}
                        max={1}
                      />
                    </FormItem>
                    <FormItem
                      label={t('common.words.photos')}
                      name="photos"
                    >
                      <UploaderPhotos
                        key="photos"
                        files={formData.images.reduce((arr, it, i) => (i === 0 ? arr : [...arr, it]), [])}
                        onUpload={(files, deleted = null) => handleUpload('photos', files, deleted)}
                        onStatus={showMessage}
                        max={10}
                      />
                    </FormItem>
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
    </>
  );
};

export default Restaurant;
