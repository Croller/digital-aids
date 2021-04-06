import styled from 'styled-components';
import { PALETTE, THEME, FONTS } from 'client/style/constants';

export const TxtArea = styled.textarea`
  width: 100%;
  border-radius: ${THEME.borderRadiusS};
  border: 1px solid ${PALETTE.grey6};
  padding: 18px 22px;
  font-family: ${FONTS.regular};
  font-size: 16px;
  color: ${PALETTE.black};
  background-color: ${PALETTE.white};

  &:focus {
    outline: none;
  }
`;
