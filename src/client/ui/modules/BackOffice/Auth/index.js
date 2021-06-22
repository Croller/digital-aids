import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'client/store/user';
import { useTranslation } from 'react-i18next';
import { UserCircleSvg } from 'client/assets/images';
import { rules, collectError } from 'client/utils/validatorRules';

import {
  Wrapper, Container,
  LogoWrapper,
  LogoText,
  FormStyled,
  FormItemStyled,
  FormWrapper, InputStyled,
  ControlWrapper, Login, Signup,
} from './styled';

const Auth = memo(() => {
  const rootDispatch = useDispatch();
  const [form] = FormStyled.useForm();
  const [t] = useTranslation();
  const { loading } = useSelector(store => store.user);
  const rule = rules(t);

  const onFinish = (values) => {
    rootDispatch(login(values));
  };

  const onFinishFailed = ({ errorFields }) => {
    collectError(errorFields);
  };

  return (
    <Wrapper>
      <Container>
        <LogoWrapper>
          <UserCircleSvg />
          <LogoText>
            {t('common.words.authorization')}
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
            <FormItemStyled
              label={t('common.words.signin')}
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
          </FormWrapper>
          <ControlWrapper>
            <FormItemStyled>
              <Login type="primary" htmlType="submit" loading={loading}>
                {t('common.words.signin')}
              </Login>
            </FormItemStyled>
            <FormItemStyled>
              <Signup path="/present">
                {t('common.words.signup')}
              </Signup>
            </FormItemStyled>
          </ControlWrapper>
        </FormStyled>
      </Container>
    </Wrapper>
  );
});

export default Auth;
