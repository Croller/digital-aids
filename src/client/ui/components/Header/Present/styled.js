import styled from 'styled-components';
import { Input } from 'client/ui/components/_ui/Input';
import {
  PALETTE,
  BREAKPOINTS,
  THEME,
  FONTS,
} from 'client/style/constants';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${PALETTE.white};
  height: 104px;
  box-shadow: ${THEME.boxShadowHeader};
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 104px;
  width: 1202px;

  @media screen and (min-width: ${BREAKPOINTS.large}) {
    max-width: ${BREAKPOINTS.large};
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: auto;
  width: auto;

  svg {
    width: 200px;
    height: 32px;
  }
`;

export const LogoText = styled.span`
  position: absolute;
  bottom: -2px;
  right: 98px;
  font-family: ${FONTS.semiBold};
  font-size: 12px;
  color: ${PALETTE.green1};
  z-index: 1;
  width: 100%;
  text-align: right;
`;

export const ControlWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Search = styled(Input)`
  width: 458px;
  height: 60px;
  background-color: ${PALETTE.grey11};
  border: 0;
  font-size: 18px;

  svg {
    width: 24px;
    height: 24px;

    path {
      fill: ${PALETTE.grey12};
    }
  }
`;

export const Phone = styled.div`
  font-family: ${FONTS.regular};
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 52px;

  svg {
    width: 36px;
    height: 36px;
    margin-right: 8px;

    path {
      fill: ${PALETTE.green1};
    }
  }
`;

export const User = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 52px;

  svg {
    width: 40px;
    height: 40px;

    path {
      fill: ${PALETTE.green1};
    }
  }
`;

