import styled from 'styled-components';
import { PALETTE, THEME, FONTS } from 'client/style/constants';
import { Button } from 'client/ui/components/_ui/Button';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 137px;
`;

export const Control = styled(Button)`
  min-width: 35px;
  height: 35px;
  font-size: 18px;
  font-family: ${FONTS.medium};
  background-color: ${PALETTE.white};
  border-radius: ${THEME.borderRadiusBlockControl};
  border: 1px solid ${PALETTE.black};

  &:not(:last-child) {
    margin-right: 16px;
  }
`;

export const Count = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 35px;
  height: 35px;
  font-size: 18px;
  font-family: ${FONTS.medium};
  border-radius: ${THEME.borderRadiusBlockControl};
  margin-right: 16px;
  background-color: ${p => (p.selected ? `${PALETTE.grey2}` : `${PALETTE.black}`)};
  color: ${p => (p.selected ? `${PALETTE.black}` : `${PALETTE.white}`)};
`;
