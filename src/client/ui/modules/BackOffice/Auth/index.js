import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { UserCircleSvg } from 'client/assets/images';
import { rules, collectError } from 'client/utils/validatorRules';
import { showMessage } from 'client/ui/components/_ui/Message';
import {
  login,
  registration,
  reset,
  set,
} from 'client/store/user';
import {
  Wrapper, Container,
  LogoWrapper,
  LogoText,
  FormStyled,
  FormItemStyled,
  FormWrapper, InputStyled,
  ControlWrapper, Submit, Switch,
} from './styled';

const Auth = memo(() => {
  const rootDispatch = useDispatch();
  const [form] = FormStyled.useForm();
  const [t] = useTranslation();
  const [formKey, setFormKey] = useState('auth');
  const { loading, status } = useSelector(store => store.user);
  const rule = rules(t);

  const onFinish = (values) => {
    formKey === 'auth' && rootDispatch(login(values));
    formKey === 'reg' && rootDispatch(registration({
      ...values,
      type: formKey,
      subject: t('common.account.mail.registration.subject'),
      body: t('common.account.mail.registration.text'),
    }));
    formKey === 'reset' && rootDispatch(reset({
      ...values,
      type: formKey,
      subject: t('common.account.mail.restore.subject'),
      body: t('common.account.mail.restore.text'),
    }));
  };

  const onFinishFailed = ({ errorFields }) => {
    collectError(errorFields);
  };

  const handleSwitchForm = (key) => {
    if (key === 'first') {
      formKey === 'auth' && setFormKey('reg');
      formKey === 'reg' && setFormKey('auth');
      formKey === 'reset' && setFormKey('reg');
    }
    if (key === 'second') {
      formKey === 'auth' && setFormKey('reset');
      formKey === 'reg' && setFormKey('reset');
      formKey === 'reset' && setFormKey('auth');
    }
    form.setFieldsValue({});
  };

  useEffect(() => {
    if (status && status !== 'updated') {
      showMessage({ type: 'success', content: t(`common.words.${status}`) });
      rootDispatch(set({ satus: null }));
      setFormKey('auth');
    }
  }, [status]);

  return (
    <Wrapper>
      <Container>
        <LogoWrapper>
          <UserCircleSvg />
          <LogoText>
            {formKey === 'auth' && t('common.words.authorization')}
            {formKey === 'reg' && t('common.words.registration')}
            {formKey === 'reset' && t('common.words.resetPassword')}
          </LogoText>
        </LogoWrapper>
        <FormStyled
          form={form}
          layout="vertical"
          initialValues={{
            login: 'test',
            password: '2323232',
            email: 'nightcroller@yandex.ru',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          scrollToFirstError
        >
          <FormWrapper>
            {['auth', 'reg'].includes(formKey) && (
              <>
                <FormItemStyled
                  label={t('common.words.login')}
                  name="login"
                  rules={rule.login}
                >
                  <InputStyled
                    placeholder={t('common.form.placeholder.text')}
                  />
                </FormItemStyled>
                <FormItemStyled
                  label={t('common.words.password')}
                  name="password"
                  rules={rule.password}
                >
                  <InputStyled
                    type="password"
                    placeholder={t('common.form.placeholder.text')}
                  />
                </FormItemStyled>
              </>
            )}
            {['reg', 'reset'].includes(formKey) && (
              <FormItemStyled
                label={t('common.words.email')}
                name="email"
                rules={rule.email}
              >
                <InputStyled
                  placeholder={t('common.form.placeholder.text')}
                />
              </FormItemStyled>
            )}
          </FormWrapper>
          <ControlWrapper>
            <Submit type="primary" htmlType="submit" loading={loading} disabled={loading}>
              {formKey === 'auth' && t('common.words.signin')}
              {formKey === 'reg' && t('common.words.signup')}
              {formKey === 'reset' && t('common.words.reset')}
            </Submit>
            <Switch disabled={loading} onClick={() => handleSwitchForm('first')}>
              {['auth', 'reset'].includes(formKey) && t('common.words.registration')}
              {['reg'].includes(formKey) && t('common.words.authorization')}
            </Switch>
            <Switch disabled={loading} onClick={() => handleSwitchForm('second')}>
              {['auth', 'reg'].includes(formKey) && t('common.words.resetPassword')}
              {['reset'].includes(formKey) && t('common.words.authorization')}
            </Switch>
          </ControlWrapper>
        </FormStyled>
      </Container>
    </Wrapper>
  );
});

export default Auth;
