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
  padding: 22px 23px 20px 24px;
  margin-bottom: 30px;
  background-color: ${PALETTE.white};
  border-radius: ${THEME.borderRadiusL};
  box-shadow: ${THEME.boxShadow2};

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    height: auto;
  }
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const Name = styled(IconText)`
  font-family: ${FONTS.semiBold};
  font-size: 22px;

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
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const Control = styled(Button)`
  position: relative;
  display: flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  padding: 0;
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
  border: 1px solid ${PALETTE.grey23};
  margin: 18px 0;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    flex-direction: row;
  }
`;

export const Contacts = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

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
  width: calc(100% + 2%);
  flex-flow: row wrap;
  justify-content: space-between;
  margin-left: -1%;
`;
export const DashItem = styled.div`
  position: relative;
  display: flex;
  width: 18%;
  height: 160px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 22px 18px;
  margin: 0 1% 20px;
  border-radius: ${THEME.borderRadiusL};
  box-shadow: ${THEME.boxShadow2};
  cursor: pointer;

  &:last-child {
    margin-right: auto;
  }

  > svg {
    width: 44px;
    height: 44px;
    margin: 12px 0 18px;

    path {
      fill: ${PALETTE.black1};
    }
  }

  &:hover {
    > svg {
      path {
        fill: ${PALETTE.green1};
      }
    }
  }
`;

export const Bandage = styled.span`
  position: absolute;
  top: 7px;
  right: 8px;
  display: flex;
  min-width: 12px;
  height: 12px;
  align-items: center;
  justify-content: center;
  background-color: ${PALETTE.red1};
  border-radius: 50%;
  color: ${PALETTE.white};
  font-family: ${FONTS.bold};
`;

export const DashItemName = styled.span`
  font-family: ${FONTS.bold};
  font-size: 16px;
  text-transform: uppercase;
`;
