import styled from 'styled-components';
import { BREAKPOINTS } from 'client/style/constants';

export const Wrapper = styled.div`
  display: block;
`;

export const Cotainer = styled.div`
  display: block;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    width: auto;
  }
`;

export const Content = styled.div`
  width: 100%;
  padding-top: 97px;
  display: flex;
  justify-content: center;

  /* padding-left: ${p => (p.sidebar ? '245px' : '0')};
  padding-right: 245px; */
`;

export const Block = styled.div`
  width: 100%;
  max-width: 1195;
  padding: 30px 36px 30px 22px;
`;
