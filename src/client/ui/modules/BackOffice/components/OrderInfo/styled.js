import styled from 'styled-components';
import {
  FONTS,
  PALETTE,
  THEME,
  BREAKPOINTS,
} from 'client/style/constants';
import { Button } from 'client/ui/components/_ui/Button';
import { IconText } from 'client/ui/components/_block/IconText';
import { Menu, Dropdown } from 'antd';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${PALETTE.white};
  border-radius: ${THEME.borderRadiusL};
  box-shadow: ${THEME.boxShadow2};
  padding: 22px 23px 20px 24px;
  margin-bottom: 22px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    height: auto;
  }
`;

export const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Order = styled(IconText)`
  font-size: 18px;
  font-family: ${FONTS.medium};
  min-width: 120px;

  > span > svg {
    width: 26px;
    height: 26px;
    margin-right: 16px;

    path: {
      fill: ${PALETTE.green1};
    }
  }
`;

export const Table = styled(IconText)`
  font-size: 14px;
  font-family: ${FONTS.medium};

  > span > svg {
    width: 26px;
    height: 26px;
    margin-right: 16px;

    path: {
      fill: ${PALETTE.green1};
    }
  }
`;

export const Date = styled(IconText)`
  font-size: 14px;
  font-family: ${FONTS.medium};

  > span > svg {
    width: 26px;
    height: 26px;
    margin-right: 16px;

    path: {
      fill: ${PALETTE.green1};
    }
  }
`;

export const Status = styled(Button)`
  width: 186px;
  font-size: 14px;
  font-family: ${FONTS.medium};
  color: ${PALETTE.black1};
  background-color: ${PALETTE.grey26};
  border-radius: ${THEME.borderRadiusS};
  text-transform: uppercase;
`;

export const DropdownStyled = styled(Dropdown)`
  display: block;
`;

export const MenuStyled = styled(Menu)`
  display: block;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 82px;
`;

export const Control = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 32px;
  height: 32px;
  background-color: ${PALETTE.grey26};
  border-radius: ${THEME.borderRadiusS};

  &:not(:last-child) {
    margin-right: 18px;
  }

  > svg {
    width: 18px;
    height: 100%;

    path {
      fill: ${PALETTE.black1};
    }
  }
`;

export const Details = styled.div`
  margin-top: 10px;
  padding: 0 24px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Title = styled.h3`
  font-family: ${FONTS.semiBold};
  font-size: 16px;
  text-transform: uppercase;
  margin: 0;
`;

export const DishList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: ${PALETTE.white};
  margin-bottom: 12px;
  box-shadow: ${p => (p.dailymenu ? `${THEME.boxShadow1}` : 'none')};
  border-bottom-left-radius: ${p => (p.dailymenu ? `${THEME.borderRadiusM}` : 0)};
  border-bottom-right-radius: ${p => (p.dailymenu ? `${THEME.borderRadiusM}` : 0)};

  > div {
    width: 380px;
    height: 380px;
    padding-bottom: 0;

    &:not(:last-child) {
      margin-bottom: 22px;
      margin-right: 22px;
    }

    h3 {
      line-height: 20px;
      height: 60px;
    }

    > div {
      &:last-child {
        > div {
          > button {
            display: none;
          }
        }
      }
    }
  }
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
  border-top-left-radius: ${THEME.borderRadiusM};
  border-top-right-radius: ${THEME.borderRadiusM};
  padding: 0 22px 0 12px;
  margin-bottom: 20px;
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

export const Hr = styled.hr`
  margin: 18px 0;
  border: 1px solid ${PALETTE.grey23};
`;
