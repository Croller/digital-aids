import styled, { css } from 'styled-components';
import { PALETTE, Z_INDEX, THEME } from 'client/style/constants';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${PALETTE.white};
  height: 60px;
  box-shadow: ${THEME.boxShadowHeader};

  ${p => p.isMobile && css`
    position: fixed;
    z-index: ${Z_INDEX.header};
    top: 0;
    left: 0;
    width: 100%;
  `}
`;

export const LogoWrapper = styled.div`
  height: 45;
  width: 140;
  margin-left: 20px;
`;

export const LogoImg = styled.img`
  height: 44px;
`;

export const ControlWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 19px;
  width: 24px;
  margin-right: 27px;
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
`;

export const Hamburger = styled.div`
  display: block;

  > svg {
    width: 24px;
    height: 20px;

    path {
      fill: ${PALETTE.grey1};
    }
  }
`;
