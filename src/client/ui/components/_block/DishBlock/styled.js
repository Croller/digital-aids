import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button';
import { CheckBox } from 'client/ui/components/_ui/CheckBox';
import { DishImage } from 'client/ui/components/_block/DishImage';
import { FONTS, THEME, PALETTE } from 'client/style/constants';

export const DishWrapper = styled.div`
  position: relative;
  box-shadow: ${THEME.boxShadow1};
  padding-bottom: 1px;

  img {
    border-top-left-radius: ${THEME.borderRadius};
    border-top-right-radius: ${THEME.borderRadius};
  }

  &:not(:last-child) {
    margin-bottom: 22px;
  }
`;

export const DishImageStyled = styled(DishImage)`
  display: block;
`;

export const ButtonStyled = styled(Button)`
  height: 60px;
  font-family: ${FONTS.medium};
  box-shadow: ${THEME.boxShadow1};
  border-radius: ${THEME.borderRadius};
  background-color: ${PALETTE.white};
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

export const CounterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  margin-bottom: 32px;
`;

export const Price = styled.div`
  height: 35px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${p => (p.selected ? `${PALETTE.grey2}` : `${PALETTE.black}`)};
  font-family: ${FONTS.bold};
  font-size: 16px;
  color: ${p => (p.selected ? `${PALETTE.black}` : `${PALETTE.white}`)};
  padding: 0 14px;
  border-radius: ${THEME.borderRadiusControl};
`;

export const CheckBoxStyled = styled(CheckBox)`
  position: absolute;
  right: 12px;
  top: 156px;
  width: 24px;
  height: 24px;
`;
