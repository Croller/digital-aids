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
  btn = null,
  onClick,
  className,
}) => (
  <Wrapper className={className} btn={btn}>
    <LogoTitle>
      <ChefSvg />
    </LogoTitle>
    <Content>
      <Text>
        {text} 
      </Text>
      {btn && (
        <ButtonStyled onClick={onClick}>
          {btn}
        </ButtonStyled>
      )}
    </Content>
  </Wrapper>
));
