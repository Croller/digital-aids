import styled, { css } from 'styled-components';
import { PALETTE, Z_INDEX } from 'client/style/constants';

export const Wrapper = styled.div`
  display: block;
  background-color: ${PALETTE.white};
  height: 60px;

  ${p => p.mobile && css`
    position: fixed;
    z-index: ${Z_INDEX.header};
    top: 0;
    left: 0;
    width: 100%;
  `}
`;
