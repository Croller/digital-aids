import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AccountForm } from 'client/ui/modules/BackOffice/components/AccountForm';
import { UserCircleSvg } from 'client/assets/images';
import { update } from 'client/store/user';
import {
  AccountWrapper,
  Header,
  Title,
  Controls,
  Control,
  Container,
  ViewStyled,
  ViewItemStyled,
} from './styled';

const Account = () => {
  const { info, roles } = useSelector(s => s.user);
  const { loading } = useSelector(s => s.backOffice);
  const rootDispatch = useDispatch();
  const [t] = useTranslation();
  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = (obj) => {
    rootDispatch(update(obj));
    setIsEdit(!isEdit);
  };

  return info && (
    <AccountWrapper>
      <Header>
        <Title
          icon={<UserCircleSvg />}
          text={t('common.words.profile')}
        />
        <Controls>
          <Control onClick={() => setIsEdit(!isEdit)}>
            {isEdit ? t('common.words.cancel') : t('common.words.edit')}
          </Control>
        </Controls>
      </Header>
      <Container>
        {!isEdit ? (
          <>
            <ViewStyled layout="vertical">
              <ViewItemStyled label={t('common.form.user.surname')}>
                {info.surname}
              </ViewItemStyled>
              <ViewItemStyled label={t('common.words.login')}>
                {info.login}
              </ViewItemStyled>
            </ViewStyled>
            <ViewStyled layout="vertical">
              <ViewItemStyled label={t('common.form.user.name')}>
                {info.name}
              </ViewItemStyled>
              <ViewItemStyled label={t('common.words.password')}>
                ******
              </ViewItemStyled>
            </ViewStyled>
            <ViewStyled layout="vertical">
              <ViewItemStyled label={t('common.form.user.middlename')}>
                {info.middlename}
              </ViewItemStyled>
              <ViewItemStyled label={t('common.words.roles')}>
                {info.roles}
              </ViewItemStyled>
            </ViewStyled>
            <ViewStyled layout="vertical">
              <ViewItemStyled label={t('common.form.user.birthdate')}>
                {info.birthdate}
              </ViewItemStyled>
            </ViewStyled>
            <ViewStyled layout="vertical">
              <ViewItemStyled label={t('common.words.phone')}>
                {info.phone}
              </ViewItemStyled>
            </ViewStyled>
            <ViewStyled layout="vertical">
              <ViewItemStyled label={t('common.words.email')}>
                {info.email}
              </ViewItemStyled>
            </ViewStyled>
          </>
        ) : (
          <AccountForm
            source={info}
            roles={roles}
            loading={loading}
            onSubmit={handleSubmit}
          />
        )}
      </Container>
    </AccountWrapper>
  );
};

export default Account;
