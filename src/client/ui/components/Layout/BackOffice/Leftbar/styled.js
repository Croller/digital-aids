import styled, { css } from 'styled-components';
import {
  PALETTE,
  THEME,
  FONTS,
} from 'client/style/constants';

export const LeftBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 245px;
  height: calc(100% - 97px);
  position: fixed;
  top: 97px;
  left: 0;
  box-shadow: ${THEME.boxShadowHeader};
`;  

export const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 32px 0 0 35px;

  &:last-child {
    margin-top: auto;
    margin-bottom: 36px;
  }
`;

export const Item = styled.li`
  font-family: ${FONTS.regular};
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  color: ${PALETTE.black};

  &:not(:last-child) {
    margin-bottom: 32px;
  }

  ${p => (p.active && css`
    font-family: ${FONTS.medium};
    color: ${PALETTE.black1} !important;

    svg {
      path {
        fill: ${PALETTE.green1} !important;
      }
    }
  `)}
`;

export const Icon = styled.span`
  margin-right: 7px;

  > svg {
    width: 20px;
    height: 20px;

    path {
      fill: ${PALETTE.grey24};
    }
  }
`;
