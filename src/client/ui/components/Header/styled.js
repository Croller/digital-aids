import styled, { css } from 'styled-components';
import { PALETTE, Z_INDEX, THEME } from 'client/style/constants';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${PALETTE.white};
  height: 60px;
  box-shadow: ${THEME.dropShadowHeader};
  padding: 0 20px 0 27px;

  ${p => p.mobile && css`
    position: fixed;
    z-index: ${Z_INDEX.header};
    top: 0;
    left: 0;
    width: 100%;
  `}
`;

export const Logo = styled.div`
  height: 38;
  width: 118;
  left: 27px;
  top: 9px;
  border: 1px solid ${PALETTE.grey1};
`;

export const ControlWrapper = styled.div`
  height: 19px;
  width: 24px;
  border: 1px solid ${PALETTE.grey1};
`;
