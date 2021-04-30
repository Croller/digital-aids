import styled from 'styled-components';
import { PALETTE, THEME, FONTS } from 'client/style/constants';

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Label = styled.label`
  font-family: ${FONTS.bold};
  font-size: 16px;
  color: ${PALETTE.black};
  text-transform: uppercase;
  margin-bottom: 18px;
`;

export const Field = styled.p`
  width: 100%;
  background-color: ${PALETTE.grey26};
  border-radius: ${THEME.borderRadiusL};
  padding: 20px 22px;
  font-family: ${FONTS.medium};
  font-size: 22px;
`;

export const InfoWrapper = styled.div`
  > div {
    &:not(:last-child) {
      margin-bottom: 22px;
    }
  }
`;
