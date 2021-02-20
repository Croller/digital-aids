import styled from 'styled-components';
import { PALETTE, THEME, FONTS } from 'client/style/constants';

export const Btn = styled.button`
  width: 100%;
  height: 48px;
  background-color: ${PALETTE.grey2};
  border-radius: ${THEME.borderRadiusBtn};
  border-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: ${FONTS.bold};
  color: ${PALETTE.black};
  text-transform: uppercase;
`;
