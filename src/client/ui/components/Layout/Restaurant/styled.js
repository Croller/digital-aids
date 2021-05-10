import styled from 'styled-components';
import { BREAKPOINTS } from 'client/style/constants';

export const Wrapper = styled.div`
  display: block;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    display: flex;
    justify-content: center;
  }
`;

export const Cotainer = styled.div`
  display: block;
  height: auto;
  padding-top: ${p => (p.header ? '60px' : 0)};
  padding-bottom: ${p => (p.footer ? '80px' : 0)};
`;

export const Content = styled.div`
  -webkit-overflow-scrolling: touch;
  overflow: auto;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    max-width: 1440px;
  }
`;
