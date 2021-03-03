import styled from 'styled-components';
import { Z_INDEX, PALETTE } from 'client/style/constants';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  
`;

export const Background = styled.div`
  background-color: ${PALETTE.black};
  opacity: 0.4;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${Z_INDEX.modal};
`;

export const Container = styled.div`
  margin: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${Z_INDEX.modal + 1};
  overflow-y: auto;
  /* padding: 24px 16px 20px; */
`;
