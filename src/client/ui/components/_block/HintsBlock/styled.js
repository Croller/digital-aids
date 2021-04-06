import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button';
import { PALETTE, THEME, FONTS } from 'client/style/constants';

export const Wrapper = styled.div`
  position: relative;
  width: 306px;
  height: auto;
  box-shadow: ${THEME.boxShadow404};
  border-radius: ${THEME.borderRadius};
  background-color: ${PALETTE.white};
  padding-bottom: ${p => (p.btn ? 0 : '58px')};
  margin: 0 auto;
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
    width: 73px;
    height: 73px;
    border-radius: 100%;
    margin-top: 14px;

    path {
      fill: ${PALETTE.green1}
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.div`
  padding: 0;
  text-align: center;
  font-size: 18px;
  font-family: ${FONTS.medium};
  color: ${PALETTE.black};
  margin-top: 96px;
  margin-bottom: 47px;
  line-height: 26px;
  white-space: pre-line;
`;

export const ButtonStyled = styled(Button)`
  width: 206px;
  height: 60px;
  margin-bottom: 58px;
  text-transform: uppercase;
`;
