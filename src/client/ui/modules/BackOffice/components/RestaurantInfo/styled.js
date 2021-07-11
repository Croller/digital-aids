import styled from 'styled-components';
import {
  FONTS,
  PALETTE,
  THEME,
  BREAKPOINTS,
} from 'client/style/constants';
import { Button } from 'client/ui/components/_ui/Button';
import { IconText } from 'client/ui/components/_block/IconText';
import { NavItem } from 'client/ui/modules/BackOffice/components/NavItem';

export const RestaurantInfoWrapper = styled.div`
  width: 100%;
`;

export const InfoWrapper = styled.div`
  width: 100%;
  background-color: ${PALETTE.white};
  border-radius: ${THEME.borderRadiusL};
  box-shadow: ${THEME.boxShadow2};
  padding: 22px 23px 20px 24px;
  margin-bottom: 30px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    height: auto;
  }
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Name = styled(IconText)`
  font-size: 22px;
  font-family: ${FONTS.semiBold};

  > span > svg {
    width: 35px;
    height: 35px;
    margin-right: 12px;

    path: {
      fill: ${PALETTE.green1};
    }
  }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
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
  position: relative;

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

export const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    flex-direction: row;
  }
`;

export const Contacts = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Phone = styled(IconText)`
  margin-bottom: 12px;
  font-family: ${FONTS.medium};
  text-transform: unset;

  > span > svg {
    margin-right: 8px;
  }
`;

export const Address = Phone;

export const NavItemStyled = styled(NavItem)`
  margin-left: auto;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    margin-left: unset;
  }
`;

export const DashboardWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: calc(100% + 2%);
  margin-left: -1%;
`;
export const DashItem = styled.div`
  position: relative;
  width: 18%;
  height: 160px;
  margin: 0 1% 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 22px 18px;
  border-radius: ${THEME.borderRadiusL};
  box-shadow: ${THEME.boxShadow2};
  cursor: pointer;

  &:last-child {
    margin-right: auto;
  }

  > svg {
    margin: 12px 0 18px;
    width: 44px;
    height: 44px;

    path {
      fill: ${PALETTE.black1};
    }
  }
`;

export const Bandage = styled.span`
  position: absolute;
  right: 8px;
  top: 7px;
  border-radius: 50%;
  background-color: ${PALETTE.red1};
  min-width: 12px;
  height: 12px;
  color: ${PALETTE.white};
  font-family: ${FONTS.bold};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DashItemName = styled.span`
  font-size: 16px;
  font-family: ${FONTS.bold};
  text-transform: uppercase;
`;
