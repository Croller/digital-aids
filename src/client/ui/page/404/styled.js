import styled from 'styled-components';
import { IconTextBtn } from 'client/ui/components/_block/HintsBlock';
import { PALETTE, FONTS } from 'client/style/constants';

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const IconTextBtnStyled = styled(IconTextBtn)`
  margin-bottom: 80px;
`;

export const Logo = styled.img`
  margin-top: 45px;
  margin-bottom: 100px;
  height: 62px;
  width: 186px;
`;

export const Code = styled.h3`
  margin-top: 20px;
  margin-bottom: 25px;
  font-size: 48px;
  font-family: ${FONTS.medium};
  color: ${PALETTE.green1};
`;

export const Text = styled.p`
  font-size: 18px;
  font-family: ${FONTS.medium};
  margin: 0;
  white-space: pre-line;
`;
