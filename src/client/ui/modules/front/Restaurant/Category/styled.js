import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button/Btn';
import { DishImage } from 'client/ui/components/_block/DishImage';
import { FONTS, THEME, PALETTE } from 'client/style/constants';

export const Wrapper = styled.div`
  padding: 20px 27px;
`;

export const Title = styled.h3`
  font-family: ${FONTS.bold};
  font-size: 16px;
  margin: 0;
  margin-bottom: 20px;
`;

export const DishList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 44px;
`;

export const DishWrapper = styled.div`
  box-shadow: ${THEME.boxShadow1};

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

export const OrderWrapper = styled.div`
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
  background-color: ${PALETTE.black};
  font-family: ${FONTS.bold};
  font-size: 16px;
  color: ${PALETTE.white};
  padding: 0 14px;
  border-radius: ${THEME.borderRadiusControl};
`;

