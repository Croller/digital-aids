import styled from 'styled-components';
import { PALETTE, THEME, FONTS } from 'client/style/constants';

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const Label = styled.label`
  font-family: ${FONTS.bold};
  font-size: 16px;
  color: ${PALETTE.black};
`;

export const Descriptions = styled.p`
  background-color: ${PALETTE.grey6};
`;

export const InfoWrapper = styled.div`
  > div {
    &:not(:last-child) {
      margin-bottom: 22px;
    }
  }
`;
