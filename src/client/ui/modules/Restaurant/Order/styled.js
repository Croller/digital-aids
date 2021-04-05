import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button';
import { ScrollHideBlock } from 'client/ui/components/_base/ScrollHideBlock';
import { IconTextBtn } from 'client/ui/components/_block/IconTextBtn';
import {
  PALETTE,
  Z_INDEX,
  THEME,
  FONTS,
} from 'client/style/constants';

export const Wrapper = styled.div`
  padding: 20px 27px;
  height: auto;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Title = styled.h3`
  font-family: ${FONTS.semiBold};
  font-size: 20px;
  text-transform: uppercase;
  margin: 0;
`;

export const TrashButton = styled(Button)`
  background-color: transparent;
  width: auto;
  height: 24px;

  > svg {
    width: 22px;
    height: 24px;

    path {
      fill: ${PALETTE.grey3}
    }
  }
`;

export const Container = styled.div`
  display: block;
`;

export const DishList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${PALETTE.white};
  margin-bottom: 42px;
  box-shadow: ${p => (p.dailymenu ? `${THEME.boxShadow1}` : 'none')};
  border-bottom-left-radius: ${p => (p.dailymenu ? `${THEME.borderRadius}` : 0)};
  border-bottom-right-radius: ${p => (p.dailymenu ? `${THEME.borderRadius}` : 0)};
  padding-bottom: 6px;
`;

export const DailyCard = styled.div`
  display: block;
`;

export const DailyHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${PALETTE.grey15};
  border-top-left-radius: ${THEME.borderRadius};
  border-top-right-radius: ${THEME.borderRadius};
  padding: 0 22px 0 12px;
  margin-bottom: 20px;
`;

export const DeleteButton = styled(Button)`
  background-color: transparent;
  padding: 0;
  width: 22px;

  > svg {
    width: 22px;
    height: 24px;
  }
`;

export const Price = styled.span`
  font-family: ${FONTS.bold};
  font-size: 21px;
  color: ${PALETTE.black};
`;

export const DailyWrapper = styled.div`
  display: block;

  &:not(:last-child) {
    margin-bottom: 34px;
  }

  img {
    border-radius: 0;
  }

  > div {
    box-shadow: none;
  }
`;

export const TitleGroup = styled.h3`
  font-family: ${FONTS.semiBold};
  font-size: 16px;
  margin: 0;
  text-transform: uppercase;
  margin-bottom: 22px;
  margin-left: 12px;
`;

export const ScrollHideBlockStyled = styled(ScrollHideBlock)`
  display: block;
  position: fixed;
  left: 0;
  bottom: 80px;
  height: 80px;
  width: 100%;
  z-index: ${Z_INDEX.footerMenu + 1};
  background-color: ${PALETTE.grey11};
`;

export const TotalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 25px;
`;

export const Total = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const TotalText = styled.span`
  font-family: ${FONTS.bold};
  font-size: 16px;
  text-transform: uppercase;
`;

export const TotalSumm = styled.span`
  font-family: ${FONTS.bold};
  font-size: 18px;
`;

export const CreateButton = styled(Button)`
  height: 48px;
  width: 172px;
  color: ${PALETTE.black};
  font-size: 14px;
  font-family: ${FONTS.medium};
  background-color: ${PALETTE.grey2};
  text-transform: uppercase;
  margin-right: 0;
`;

export const IconTextBtnStyled = styled(IconTextBtn)`
  margin-top: 74px;
  margin-bottom: 46px;
`;
