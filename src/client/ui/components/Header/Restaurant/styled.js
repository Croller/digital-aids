import styled, { css } from 'styled-components';
import {
  PALETTE,
  Z_INDEX,
  THEME,
  BREAKPOINTS,
  FONTS,
} from 'client/style/constants';
import { Button } from '../../_ui/Button';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${PALETTE.white};
  height: 60px;
  box-shadow: ${THEME.boxShadowHeader};

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    height: 104px;
    padding: 0 118px;
  }

  ${p => p.isMobile && css`
    position: fixed;
    z-index: ${Z_INDEX.header};
    top: 0;
    left: 0;
    width: 100%;
  `}
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 45px;
  width: 78%;
  margin-left: 20px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    width: 201px;
    height: 66px;
  }
`;

export const LogoImg = styled.img`
  height: 44px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    height: 66px;
  }
`;

export const Name = styled.h1`
  font-family: ${FONTS.semiBold};
  font-size: 18px;
  margin: 0;
  margin-left: 12px;
`;

export const ControlWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 19px;
  width: 24px;
  margin-right: 27px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    width: 50px;
    height: 50px;
  }
`;

export const Close = styled.div`
  display: block;

  > svg {
    width: 20px;
    height: 20px;

    path {
      fill: ${PALETTE.grey1};
    }
  }

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    display: none;
  }
`;

export const Control = styled(Button)`
  display: block;
  background-color: ${PALETTE.white};

  > svg {
    width: 24px;
    height: 20px;

    path {
      fill: ${PALETTE.grey1};
    }
  }

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    width: 50px;
    height: 50px;
    background-color: ${PALETTE.grey2};
  }
`;
