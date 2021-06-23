import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'client/ui/components/_ui/Message';
import { rules, collectError } from 'client/utils/validatorRules';
import { dataToForm, dataToApi } from 'client/store/backOffice/mapper/user';
import { getDictionaryItem } from 'client/utils/common';
import { update } from 'client/store/user';
import {
  UserCircleSvg,
} from 'client/assets/images';
import {
  AccountWrapper,
  Header,
  Title,
  Controls,
  Control,
  Container,
  FormStyled,
  FormCol,
  Form2Col,
  FormItemStyled,
  InputStyled,
  InputMaskStyled,
  ViewStyled,
  ViewItemStyled,
  Save,
} from './styled';

const Account = () => {
  const {
    info,
    dictionary,
  } = useSelector(s => s.user);
  const {
    status,
    loading,
  } = useSelector(s => s.backOffice);
  const [t] = useTranslation();
  const rule = rules(t);
  const rootDispatch = useDispatch();
  const [isChange, setIsChange] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form] = FormStyled.useForm();
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
    rootDispatch(update({ token: info.token, data: dataToApi(obj, info) }));
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
    window.prerenderReady = true;
  }, []);

  useEffect(() => {
    if (info && info.token) {
      const rolesMap = info.roles.map(role => getDictionaryItem(role, 'id', dictionary.roles, 'name'));
      setFiledsValue({ ...dataToForm(info), roles: rolesMap.join(', ') });
    }
  }, [info, info.token]);

  useEffect(() => {
    if (status) {
      showMessage({ type: 'success', content: t(`common.words.${status}`) });
    }
  }, [status]);

  return formData && (
    <AccountWrapper>
      <Header>
        <Title
          icon={<UserCircleSvg />}
          text={t('common.words.profile')}
        />
        <Controls>
          <Control disabled={isEdit} onClick={() => setIsEdit(!isEdit)}>
            {t('common.words.edit')}
          </Control>
        </Controls>
      </Header>
      <Container>
        <FormStyled
          form={form}
          layout="vertical"
          initialValues={formData}
          onFinish={handleFinish}
          onValuesChange={handleValuesChange}
          onFinishFailed={handleFinishFailed}
        >
          {!isEdit ? (
            <>
              <ViewStyled layout="vertical">
                <ViewItemStyled label={t('common.form.user.surname')}>
                  {formData.surname}
                </ViewItemStyled>
                <ViewItemStyled label={t('common.words.login')}>
                  {formData.login}
                </ViewItemStyled>
              </ViewStyled>
              <ViewStyled layout="vertical">
                <ViewItemStyled label={t('common.form.user.name')}>
                  {formData.name}
                </ViewItemStyled>
                <ViewItemStyled label={t('common.words.password')}>
                  ******
                </ViewItemStyled>
              </ViewStyled>
              <ViewStyled layout="vertical">
                <ViewItemStyled label={t('common.form.user.middlename')}>
                  {formData.middlename}
                </ViewItemStyled>
                <ViewItemStyled label={t('common.words.roles')}>
                  {formData.roles}
                </ViewItemStyled>
              </ViewStyled>
              <ViewStyled layout="vertical">
                <ViewItemStyled label={t('common.form.user.birthdate')}>
                  {formData.birthdate}
                </ViewItemStyled>
              </ViewStyled>
              <ViewStyled layout="vertical">
                <ViewItemStyled label={t('common.words.phone')}>
                  {formData.phone}
                </ViewItemStyled>
              </ViewStyled>
              <ViewStyled layout="vertical">
                <ViewItemStyled label={t('common.words.email')}>
                  {formData.email}
                </ViewItemStyled>
              </ViewStyled>
            </>
          ) : (
            <>
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
                    required
                    rules={rule.birthdate}
                  >
                    <InputMaskStyled mask="11.11.1111" placeholder={t('common.form.placeholder.text')} />
                  </FormItemStyled>
                  <FormItemStyled
                    label={t('common.words.phone')}
                    rules={rule.phone}
                    name="phone"
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
                      disabled={info.roles.includes(1)}
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
                      disabled={info.roles.includes(1)}
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
            </>
          )}
        </FormStyled>
      </Container>
    </AccountWrapper>
  );
};

export default Account;
