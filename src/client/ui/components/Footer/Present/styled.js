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
  height: 189px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    height: 83px;
    padding: unset;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    flex-direction: row;
    max-width: ${BREAKPOINTS.large};
  }
`;

export const Roles = styled.span`
  font-family: ${FONTS.regular};
  font-size: 12px;
  color: ${PALETTE.grey19};
  text-transform: uppercase;
  cursor: pointer;
  order: 2;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    margin-left: 119px;
    font-size: 16px;
    order: 1;
  }
`;

export const ControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  order: 1;
  margin-bottom: 24px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    margin-bottom: unset;
    margin-right: 124px;
    flex-direction: row;
    order: 2;
  }
`;

export const LinkButton = styled.span`
  font-family: ${FONTS.regular};
  font-size: 16px;
  color: ${PALETTE.grey19};
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    flex-direction: row;
    order: 2;

    &:not(:last-child) {
      margin-bottom: unset;
      margin-right: 20px;
    }
  }
`;
