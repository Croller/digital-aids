import styled from 'styled-components';
import { PALETTE } from 'client/style/constants';

export const Wrapper = styled.div`
  display: block;
`;

export const Cotainer = styled.div`
  display: block;
  background-color: ${PALETTE.grey1};
  height: 3000px;
  padding: 60px 0 80px;
`;

export const Content = styled.div`
  -webkit-overflow-scrolling: touch;
  overflow: auto;
`;
