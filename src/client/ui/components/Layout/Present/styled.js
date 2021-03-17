import styled from 'styled-components';
import { BREAKPOINTS } from 'client/style/constants';

export const Wrapper = styled.div`
  display: block;
`;

export const Cotainer = styled.div`
  display: block;
  height: auto;
  padding-top: 74px;
  padding-bottom: ${p => (p.footer ? '80px' : 0)};

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    padding-top: 104px;
  }
`;

export const Content = styled.div`
  -webkit-overflow-scrolling: touch;
  overflow: auto;
`;
