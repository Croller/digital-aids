import styled from 'styled-components';
import {
  PALETTE,
  BREAKPOINTS,
  FONTS,
} from 'client/style/constants';

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${PALETTE.black1};
  height: 83px;
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 83px;
  width: 100%;

  @media screen and (min-width: ${BREAKPOINTS.large}) {
    max-width: ${BREAKPOINTS.large};
  }
`;

export const Roles = styled.span`
  margin-left: 119px;
  font-family: ${FONTS.regular};
  font-size: 16px;
  color: ${PALETTE.grey19};
  text-transform: uppercase;
`;

export const ControlWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 124px;
`;

export const LinkButton = styled.span`
  font-family: ${FONTS.regular};
  font-size: 16px;
  color: ${PALETTE.grey19};

  &:not(:last-child) {
    margin-right: 20px;
  }
`;
