import styled from 'styled-components';
import { FONTS, PALETTE, THEME } from 'client/style/constants';
import { Button } from 'client/ui/components/_ui/Button';
import { IconText } from 'client/ui/components/_block/IconText';

export const Wrapper = styled.div`
  width: 100%;
  height: 176px;
  background-color: ${PALETTE.white};
  border-radius: ${THEME.borderRadiusL};
  box-shadow: ${THEME.boxShadow2};
  padding: 22px 23px 20px 24px;
  margin-bottom: 22px;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Name = styled(IconText)`
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
    height: 18px;
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

  > svg {
    width: 22px;
    height: 22px;
    margin-right: 8px;

    path: {
      fill: ${PALETTE.green1};
    }
  }

  > span {
    font-size: 16px;
    font-family: ${FONTS.medium};
    text-transform: unset;
  }
`;

export const Address = Phone;

export const NavWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const NavButton = styled(Button)`
  height: 50px;
  padding: 0;
  min-width: 180px;
  font-size: 16px;
  font-family: ${FONTS.medium};
  background-color: ${PALETTE.green1};

  &:not(:last-child) {
    margin-right: 8px;
  }

  > span {
    > span > svg {
      width: 22px;
      height: 22px;
      margin-right: 10px;

      path {
        fill: ${PALETTE.white};
      }
    }

    > span {
      color: ${PALETTE.white};
      text-transform: uppercase;
    }
  }
`;
