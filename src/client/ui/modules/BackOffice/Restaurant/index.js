import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { rules, collectError } from 'client/utils/validatorRules';
import { showMessage } from 'client/ui/components/_ui/Message';
import {
  Wrapper,
  TopbarStyled,
  FormStyled,
  Form2Col,
  FormCol,
  FormItemSubmit, Save,
  InputStyled,
  InputMaskStyled,
  SelectStyled, OptionStyled,
  UploaderLogo,
  UploaderPhotos,
} from './styled';

const FormItem = FormStyled.Item;

const Restaurant = () => {
  const params = useParams();
  const history = useHistory();
  const rootDispatch = useDispatch();
  const [form] = FormStyled.useForm();
  const [t] = useTranslation();
  const { pathname } = useLocation();
  const { loading } = useSelector(store => store.backOffice);
  const rule = rules(t);
  const [formData, setFormData] = useState({});

  console.log(params);
  const handleChange = (key) => {
    if (key === 'delete') {
      history.goBack();
    }
    console.log('event', key);
  };

  const handleFinish = (values) => {
    console.log(values);
    // rootDispatch(login(values));
  };

  const handleFinishFailed = ({ errorFields }) => {
    collectError(errorFields);
    showMessage({
      type: 'error',
      content: t('common.form.error.notFilled'),
    });
  };

  const handleValuesChange = (values) => {
    console.log(values);
    setFormData({ ...formData, ...values });
  };

  const handleUpload = (key, files) => {
    console.log(key, files);
  };

  useEffect(() => {
    window.prerenderReady = true;
  }, [pathname]);

  return (
    <Wrapper>
      <TopbarStyled
        settings={{ delete: params.restautant !== 'new' }}
        onChange={handleChange}
      />
      <FormStyled
        form={form}
        layout="vertical"
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
              label={t('common.words.translate')}
              name="translate"
            >
              <InputStyled
                disabled
                placeholder={t('common.form.text')}
              />
            </FormItem>
            <FormItem
              label={t('common.words.cuisine')}
              name="cuisine"
              required
              rules={rule.text}
            >
              <InputStyled
                placeholder={t('common.form.text')}
              />
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
              rules={rule.phone}
            >
              <InputMaskStyled
                mask="1a11 1111 1111 1111"
                placeholder={t('common.form.text')}
              />
            </FormItem>
            <FormItem
              label={t('common.words.contactPerson')}
              name="employees"
              required
              rules={rule.text}
            >
              <InputStyled
                placeholder={t('common.form.text')}
              />
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
              label={t('common.words.opinion')}
              name="opinion"
              required
              rules={rule.email}
            >
              <InputStyled
                placeholder={t('common.form.text')}
              />
            </FormItem>
            <FormItem
              label={t('common.words.currency')}
              name="currency"
              required
              rules={rule.email}
            >
              <SelectStyled
                placeholder={t('common.form.select')}
              >
                <OptionStyled value="lucy">Lucy</OptionStyled>
                <OptionStyled value="2">Lucy</OptionStyled>
                <OptionStyled value="3">Lucy</OptionStyled>
              </SelectStyled>
            </FormItem>
            <FormItem
              label={t('common.words.avg_price')}
              name="avg_price"
              required
              rules={rule.number}
            >
              <InputStyled
                type="number"
                placeholder={t('common.form.numberExample')}
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
              name="thefork"
            >
              <InputStyled
                placeholder={t('common.form.text')}
              />
            </FormItem>
            <FormItem
              label="TripAdviser"
              name="tripadviser"
            >
              <InputStyled
                placeholder={t('common.form.text')}
              />
            </FormItem>
            <FormItem
              label="Facebook"
              name="facebook"
            >
              <InputStyled
                placeholder={t('common.form.text')}
              />
            </FormItem>
            <FormItem
              label="Instagram"
              name="instagram"
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
                <OptionStyled value="lucy">Lucy</OptionStyled>
                <OptionStyled value="2">Lucy</OptionStyled>
                <OptionStyled value="3">Lucy</OptionStyled>
              </SelectStyled>
            </FormItem>
            <FormItem
              label={t('common.words.translations')}
              name="languages"
              required
              rules={rule.email}
            >
              <SelectStyled
                placeholder={t('common.form.select')}
              >
                <OptionStyled value="lucy">Lucy</OptionStyled>
                <OptionStyled value="2">Lucy</OptionStyled>
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
            <FormItem
              label={t('common.words.logo')}
              name="logo"
            >
              <UploaderLogo
                onUpload={(files) => handleUpload('logo', files)}
                max={1}
              />
            </FormItem>
            <FormItem
              label={t('common.words.photos')}
              name="photos"
            >
              <UploaderPhotos
                max={10}
                onUpload={(files) => handleUpload('photos', files)}
              />
            </FormItem>
          </FormCol>
        </Form2Col>
        <FormItemSubmit>
          <Save
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={Object.keys(formData).length === 0}
          >
            {t('common.words.save')}
          </Save>
        </FormItemSubmit>
      </FormStyled>
    </Wrapper>
  );
};

export default Restaurant;
