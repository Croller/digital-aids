import styled from 'styled-components';
import { Input } from 'client/ui/components/_ui/Input';
import { Button } from 'client/ui/components/_ui/Button';
import {
  PALETTE,
  BREAKPOINTS,
  THEME,
  FONTS,
  Z_INDEX,
} from 'client/style/constants';

import {
  LoupeSvg,
} from 'client/assets/images';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${PALETTE.white};
  height: 74px;
  box-shadow: ${THEME.boxShadowHeader};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${Z_INDEX.header};

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    height: 104px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 74px;
  width: 1202px;
  padding: 0 20px 0 26px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    height: 104px;
    max-width: ${BREAKPOINTS.large};
    padding: 0;
  }
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
    width: 142px;
    height: 24px;
  }

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    svg {
      width: 200px;
      height: 32px;
    }
  }
`;

export const LogoText = styled.span`
  position: absolute;
  bottom: -2px;
  right: 76px;
  font-family: ${FONTS.semiBold};
  font-size: 8px;
  color: ${PALETTE.green1};
  z-index: 1;
  width: 100%;
  text-align: right;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    font-size: 12px;
    right: 98px;
  }
`;

export const ControlWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${p => (p.show ? '100%' : '138px')};
  margin-left: auto;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    justify-content: center;
    width: auto;
  }
`;

export const Search = styled(Input)`
  display: ${p => (p.show ? 'flex' : 'none')};
  width: 100%;
  height: 42px;
  background-color: ${PALETTE.grey11};
  border: 0;
  font-size: 18px;
  padding: 0 18px;

  svg {
    width: 24px;
    height: 24px;
    transform: rotate(90deg);

    path {
      fill: ${PALETTE.grey12};
    }
  }

  .ant-input-suffix {
    svg {
      width: 14px;
      height: 14px;
    }
  }

  input {
    padding: 0 10px;
    background-color: ${PALETTE.grey11};
  }

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    width: 458px;
    height: 60px;
    display: flex;

    input {
      font-size: 18px;
    }

    .ant-input-suffix {
      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const LoupeSvgStyled = styled(LoupeSvg)`
  display: block;
  width: 28px;
  height: 28px;
  transform: rotate(90deg);

  path {
    fill: ${PALETTE.grey12};
  }

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    display: none;
  }
`;

export const Phone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    width: 28px;
    height: 28px;

    path {
      fill: ${PALETTE.green1};
    }
  }

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    margin: 0 52px;

    svg {
      margin-right: 8px;
    }
  }
`;

export const PhoneText = styled.span`
  display: none;
  font-family: ${FONTS.regular};
  font-size: 16px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    display: block;
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
    border-radius: ${THEME.borderRadius};
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
  border-radius: ${THEME.borderRadius};
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
  border-bottom-left-radius: ${THEME.borderRadius};
  border-bottom-right-radius: ${THEME.borderRadius};
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

export const User = styled.div`
  display: none;
  justify-content: center;
  align-items: center;

  svg {
    width: 28px;
    height: 28px;

    path {
      fill: ${PALETTE.green1};
    }
  }

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    margin-left: 52px;

    svg {
      width: 40px;
      height: 40px;
    }
  }
`;

