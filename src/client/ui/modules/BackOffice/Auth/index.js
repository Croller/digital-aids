import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'client/store/user';
import { useTranslation } from 'react-i18next';
import { UserCircleSvg } from 'client/assets/images';
import { rules } from 'client/utils/validatorRules';
import {
  Wrapper, Container,
  LogoWrapper,
  LogoText,
  FormStyled,
  FormWrapper, InputStyled,
  ControlWrapper, Login, Signup,
} from './styled';

const FormItem = FormStyled.Item;

const Auth = memo(() => {
  const rootDispatch = useDispatch();
  const [form] = FormStyled.useForm();
  const [t] = useTranslation();
  const { loading } = useSelector(store => store.user);
  const rule = rules(t);

  const onFinish = (values) => {
    // login: 'rootAdmin',
    // password: 'dcfoodfans2021'
    rootDispatch(login(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Wrapper>
      <Container>
        <LogoWrapper>
          <UserCircleSvg />
          <LogoText>
            {t('common.auth.title')}
          </LogoText>
        </LogoWrapper>
        <FormStyled
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          scrollToFirstError
        >
          <FormWrapper>
            <FormItem
              label={t('common.form.login')}
              name="login"
              hasFeedback
              rules={rule.login}
            >
              <InputStyled
                placeholder={t('common.form.text')}
              />
            </FormItem>
            <FormItem
              label={t('common.form.password')}
              name="password"
              hasFeedback
              rules={rule.password}
            >
              <InputStyled
                type="password"
                placeholder={t('common.form.text')}
              />
            </FormItem>
          </FormWrapper>
          <ControlWrapper>
            <FormItem>
              <Login type="primary" htmlType="submit" loading={loading}>
                {t('common.auth.login')}
              </Login>
            </FormItem>
            <Signup>
              {t('common.auth.signup')}
            </Signup>
          </ControlWrapper>
        </FormStyled>
      </Container>
    </Wrapper>
  );
});

export default Auth;
