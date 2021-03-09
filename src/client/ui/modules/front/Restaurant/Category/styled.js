import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button/Btn';
import { CheckBox } from 'client/ui/components/_ui/CheckBox';
import { DishImage } from 'client/ui/components/_block/DishImage';
import { FONTS, THEME, PALETTE } from 'client/style/constants';

export const Wrapper = styled.div`
  padding: 20px 27px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
`;

export const Title = styled.h3`
  font-family: ${FONTS.semiBold};
  font-size: 16px;
  margin: 0;
  text-transform: uppercase;
`;

export const InfoDailyButton = styled(Button)`
  width: 25px;
  height: 25px;
  padding: 0;
  background-color: transparent;

  > svg {
    width: 25px;
    height: 25px;

    path {
      fill: ${PALETTE.green1};
    }
  }
`;

export const WorkDailyButton = styled(Button)`
  height: 46px;
  font-size: 14px;
  margin-bottom: 32px;

  > svg {
    width: 14px;
    height: 14px;
    margin-right: 4px;

    path {
      fill: ${PALETTE.grey14};
    }
  }
`;

export const DishList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 44px;
`;

export const DailyWrapper = styled.div`
  display: block;

  &:not(:last-child) {
    margin-bottom: 34px;
  }
`;

export const TitleGroup = styled.h3`
  font-family: ${FONTS.semiBold};
  font-size: 20px;
  margin: 0;
  text-transform: uppercase;
  margin-bottom: 22px;
`;

export const DishWrapper = styled.div`
  position: relative;
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

export const DailyOrderWrapper = styled.div`
  margin-bottom: 32px;
`;

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const PriceText = styled.span`
  font-family: ${FONTS.medium};
  font-size: 18px;
  color: ${PALETTE.grey1};
  text-transform: uppercase;
`;

export const PriceDaily = styled.span`
  font-family: ${FONTS.bold};
  font-size: 18px;
  text-transform: uppercase;
`;

export const Include = styled.p`
  font-family: ${FONTS.medium};
  font-size: 18px;
  text-transform: uppercase;
  margin: 0;
  margin-bottom: 44px;
`;

export const DailyOrderButton = styled(Button)`
  height: 60px;
  font-size: 16px;
  font-family: ${FONTS.bold};
  text-transform: uppercase;
`;

