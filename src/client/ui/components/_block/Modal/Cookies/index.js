import React, { memo } from 'react';
import { CloseSvg } from 'client/assets/images';
import { useTranslation } from 'react-i18next';
import {
  Wrapper,
  CloseButton,
  Conatainer,
  Content,
  Title,
  Description,
  AcceptButton,
} from './styled';

export const CookiesModal = memo(({ onClose, onAccept }) => {
  const [t] = useTranslation();
  
  return (
    <Wrapper>
      <CloseButton onClick={onClose}>
        <CloseSvg />
      </CloseButton>
      <Conatainer>
        <Content>
          <Title>
            {t('present.cookies.title')}
          </Title>
          <Description>
            {t('present.cookies.description')}
          </Description>
        </Content>
        <AcceptButton onClick={onAccept}>
          {t('present.cookies.button')}
        </AcceptButton>
      </Conatainer>
    </Wrapper>
  );
});
