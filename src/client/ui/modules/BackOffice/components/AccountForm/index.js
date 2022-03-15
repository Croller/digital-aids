import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { showMessage } from 'client/ui/components/_ui/Message';
import { rules, collectError } from 'client/utils/validations';
import { dataToForm, dataToApi } from 'client/store/backOffice/mapper/user';
import {
  AccountFormWrapper,
  FormCol,
  Form2Col,
  FormItemStyled,
  InputStyled,
  InputMaskStyled,
  // SelectStyled,
  // OptionStyled,
  Save,
} from './styled';

export const AccountForm = ({
  // showRoles = false,
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
    onSubmit({ name: 'data_users', data: dataToApi(obj, source) });
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
    if (source && roles) {
      setFiledsValue({ ...dataToForm(source) });
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
          {/* {showRoles && (
            <FormItemStyled
              label={t('common.words.roles')}
              name="roles"
            >
              <SelectStyled
                showSearch
                mode="multiple"
                placeholder={t('common.form.placeholder.select')}
                optionFilterProp="label"
              >
                {roles.map((item, i) => (
                  <OptionStyled
                    key={`_roles_${i + 1}`}
                    value={item.id}
                    label={item.name}
                  >
                    {item.name}
                  </OptionStyled>
                ))}
              </SelectStyled>
            </FormItemStyled>
          )} */}
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
