import styled from 'styled-components';
import { Input } from 'client/ui/components/_ui/Input';
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
  position: relative;
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
  display: ${p => (p.show ? 'none' : 'flex')};
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: auto;
  width: auto;
  cursor: pointer;

  svg {
    width: 168px;
    height: 28px;
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
  right: 82px;
  font-family: ${FONTS.semiBold};
  font-size: 10px;
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
  justify-content: flex-end;
  align-items: center;
  width: 100%;

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
  display: none;
  font-family: ${FONTS.regular};
  font-size: 16px;
  justify-content: center;
  align-items: center;
  margin-left: 52px;
  cursor: pointer;

  svg {
    width: 36px;
    height: 36px;
    margin-right: 8px;

    path {
      fill: ${PALETTE.green1};
    }
  }

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    display: flex;
  }
`;

export const User = styled.div`
  display: ${p => (p.show ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  margin-left: 22px;

  svg {
    width: 32px;
    height: 32px;

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

