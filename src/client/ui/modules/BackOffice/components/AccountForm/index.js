import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { showMessage } from 'client/ui/components/_ui/Message';
import { rules, collectError } from 'client/utils/validatorRules';
import { dataToForm, dataToApi } from 'client/store/backOffice/mapper/user';
import { getDictionaryItem } from 'client/utils/common';
import {
  AccountFormWrapper,
  FormCol,
  Form2Col,
  FormItemStyled,
  InputStyled,
  InputMaskStyled,
  Save,
} from './styled';

export const AccountForm = ({
  source = null,
  roles = null,
  loading = false,
  onSubmit = () => {},
  className,
}) => {
  const [t] = useTranslation();
  const rule = rules(t);
  const [isChange, setIsChange] = useState(false);
  const [form] = AccountFormWrapper.useForm();
  const [formData, setFormData] = useState(null);

  const setFiledsValue = (obj = null) => {
    if (!obj) return;
    setFormData(obj);
    form.setFieldsValue(obj);
  };

  const handleFinish = (values = {}) => {
    const obj = {
      ...formData,
      ...values,
    };
    onSubmit({ token: source.token, data: dataToApi(obj, source) });
    setIsChange(false);
  };

  const handleFinishFailed = ({ errorFields }) => {
    collectError(errorFields);
    showMessage({
      type: 'error',
      content: t('common.form.error.notFilled'),
    });
  };

  const handleValuesChange = (values) => {
    console.log('values - ', values);
    setFiledsValue(values);
    setIsChange(true);
  };

  useEffect(() => {
    if (source && source.token && roles) {
      const rolesMap = source.roles.map(role => getDictionaryItem(role, 'id', roles, 'name'));
      setFiledsValue({ ...dataToForm(source), roles: rolesMap.join(', ') });
    }
  }, [source, roles]);

  useEffect(() => {
    if (status) {
      showMessage({ type: 'success', content: t(`common.words.${status}`) });
    }
  }, [status]);

  return formData && (
    <AccountFormWrapper
      className={className}
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
            label={t('common.form.user.surname')}
            name="surname"
            required
            rules={rule.text}
          >
            <InputStyled
              placeholder={t('common.form.placeholder.text')}
            />
          </FormItemStyled>
          <FormItemStyled
            label={t('common.form.user.name')}
            name="name"
            required
            rules={rule.text}
          >
            <InputStyled
              placeholder={t('common.form.placeholder.text')}
            />
          </FormItemStyled>
          <FormItemStyled
            label={t('common.form.user.middlename')}
            name="middlename"
            required
            rules={rule.text}
          >
            <InputStyled
              placeholder={t('common.form.placeholder.text')}
            />
          </FormItemStyled>
          <FormItemStyled
            label={t('common.form.user.birthdate')}
            name="birthdate"
            rules={rule.birthdate}
          >
            <InputMaskStyled mask="11.11.1111" placeholder={t('common.form.placeholder.text')} />
          </FormItemStyled>
          <FormItemStyled
            label={t('common.words.phone')}
            name="phone"
            rules={rule.phone}
          >
            <InputMaskStyled mask="+7 (111) 111-11-11" placeholder={t('common.form.placeholder.number')} />
          </FormItemStyled>
          <FormItemStyled
            label={t('common.words.email')}
            name="email"
          >
            <InputStyled placeholder={t('common.form.placeholder.text')} />
          </FormItemStyled>
        </FormCol>
        <FormCol>
          <FormItemStyled
            label={t('common.words.login')}
            name="login"
            required
            rules={rule.text}
          >
            <InputStyled
              placeholder={t('common.form.placeholder.text')}
            />
          </FormItemStyled>
          <FormItemStyled
            label={t('common.words.password')}
            name="password"
            required
            rules={rule.text}
          >
            <InputStyled
              type="password"
              placeholder={t('common.form.placeholder.text')}
            />
          </FormItemStyled>
          <FormItemStyled
            label={t('common.words.roles')}
            name="roles"
          >
            <InputStyled disabled placeholder={t('common.form.placeholder.text')} />
          </FormItemStyled>
        </FormCol>
      </Form2Col>
      <Save
        htmlType="submit"
        loading={loading}
        disabled={!isChange}
      >
        {t('common.words.save')}
      </Save>
    </AccountFormWrapper>
  );
};
