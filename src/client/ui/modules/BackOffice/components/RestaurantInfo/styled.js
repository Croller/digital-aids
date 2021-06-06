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

export const Wrapper = styled.div`
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

  &:not(:last-child) {
    margin-right: 18px;
  }

  > svg {
    width: 18px;

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
