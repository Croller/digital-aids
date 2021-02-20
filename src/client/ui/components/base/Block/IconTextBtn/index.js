import React, { memo } from 'react';
import { ChefSvg } from 'client/assets/images';
import {
  Wrapper,
  LogoTitle,
  Content,
  Text,
  ButtonStyled,
} from './styled';

export const IconTextBtn = memo(({
  text = '',
  btnText = '',
  onClick,
  className,
}) => (
  <Wrapper className={className}>
    <LogoTitle>
      <ChefSvg />
    </LogoTitle>
    <Content>
      <Text>
        {text} 
      </Text>
      <ButtonStyled onClick={onClick}>
        {btnText}
      </ButtonStyled>
    </Content>
  </Wrapper>
));
