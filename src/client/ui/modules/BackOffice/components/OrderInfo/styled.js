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

export const Hr = styled.hr`
  margin: 18px 0;
  border: 1px solid ${PALETTE.grey23};
`;
