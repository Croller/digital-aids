import styled from 'styled-components';
import { PALETTE, THEME, FONTS } from 'client/style/constants';
import { Button } from 'client/ui/components/base/Button/Btn';

export const Wrapper = styled.div`
  position: relative;
  width: 306px;
  height: 354px;
  box-shadow: ${THEME.boxShadow404};
  border-radius: ${THEME.borderRadius};
  background-color: ${PALETTE.white};
`;

export const LogoTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -43px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 86px;
  height: 86px;
  background-color: ${PALETTE.white};
  box-shadow: ${THEME.boxShadow1};
  border-radius: 50%;

  > svg {
    border-radius: 29%;
    margin-top: 10px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.p`
  padding: 0;
  text-align: center;
  font-size: 18px;
  font-family: ${FONTS.medium};
  color: ${PALETTE.black};
  margin-top: 96px;
  margin-bottom: 47px;
`;

export const ButtonStyled = styled(Button)`
  width: 206px;
  height: 60px;
`;
