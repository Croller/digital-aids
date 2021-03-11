import styled from 'styled-components';
import { PALETTE, BREAKPOINTS, THEME } from 'client/style/constants';

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
  height: 60px;

  @media screen and (min-width: ${BREAKPOINTS.large}) {
    max-width: ${BREAKPOINTS.large};
  }
`;

export const LogoWrapper = styled.div`
  height: 45;
  width: 140;
  margin-left: 20px;
`;

export const ControlWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 19px;
  width: 24px;
  margin-right: 27px;
`;
