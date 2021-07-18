import styled from 'styled-components';
import {
  PALETTE,
  FONTS,
  Z_INDEX,
  BREAKPOINTS,
  THEME,
} from 'client/style/constants';
import { Button } from 'client/ui/components/_ui/Button';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${PALETTE.white};
  height: 97px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${Z_INDEX.header};
  padding: 0 35px;
  border-bottom: 1px solid ${PALETTE.grey23};
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: auto;
  width: auto;
  cursor: pointer;

  svg {
    width: 182px;
    height: 36px;
  }
`;

export const LogoText = styled.span`
  position: absolute;
  bottom: -8px;
  right: 85px;
  font-family: ${FONTS.regular};
  font-size: 20px;
  color: ${PALETTE.green1};
  z-index: 1;
  width: 98px;
  text-align: right;
`;

export const Control = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    &:not(:last-child) {
      margin-right: 22px;
    }
  }
`;

export const Hamburger = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 30px;
    height: 22px;
  }
`;

export const User = styled.div`
  width: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 30px;
    height: 30px;

    path {
      fill: ${PALETTE.black};
    }
  }
`;

export const Lang = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    width: 28px;
    height: 28px;
    margin-right: 8px;

    path {
      fill: ${PALETTE.green1};
    }
  }

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    position: relative;
    width: 87px;
    height: 60px;
    border-radius: ${THEME.borderRadiusM};
    box-shadow: ${THEME.boxShadow1};

    svg {
      margin-right: 8px;
    }
  }
`;

export const LangText = styled.span`
  display: none;
  font-family: ${FONTS.semiBold};
  font-size: 16px;
  text-transform: uppercase;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    display: block;
  }
`;

export const LangWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 27px;
  left: 27px;
  display: block;
  background-color: ${PALETTE.white};
  border-radius: ${THEME.borderRadiusM};
  z-index: ${Z_INDEX.modal};

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    top: 100px;
    left: unset;
  }
`;

export const CloseButton = styled(Button)`
  position: absolute;
  top: 25px;
  right: 28px;
  width: 26px;
  height: 26px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  > svg {
    width: 26px;
    height: 26px;

    path {
      fill: ${PALETTE.grey1};
    }
  }

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    display: none;
  }
`;

export const LangList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: ${THEME.boxShadow1};
  border-bottom-left-radius: ${THEME.borderRadiusM};
  border-bottom-right-radius: ${THEME.borderRadiusM};
  padding: 64px 98px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    padding: 64px 86px;
  }
`;

export const LangButton = styled(Button)`
  width: unset;
  height: unset;
  font-size: 18px;
  font-family: ${FONTS.semiBold};
  background-color: transparent;
  color: ${p => (p.active ? `${PALETTE.green1}` : `${PALETTE.black}`)};

  &:not(:last-child) {
    margin-bottom: 32px;
  }
`;

