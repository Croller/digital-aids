import styled from 'styled-components';
import { BREAKPOINTS } from 'client/style/constants';

export const Wrapper = styled.div`
  display: block;
`;

export const Cotainer = styled.div`
  display: block;
  height: 100%;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    width: auto;
  }
`;

export const Content = styled.div`
  width: ${p => (p.sidebar ? 'calc(100% - 245px)' : '100%')};
  padding-top: 97px;
  margin-left: ${p => (p.sidebar ? '245px' : '0')};
  display: flex;
  justify-content: center;
  height: inherit;
`;

export const Block = styled.div`
  position: relative;
  width: 100%;
  max-width: 1195;
  padding: 30px 36px 0 22px;
`;
