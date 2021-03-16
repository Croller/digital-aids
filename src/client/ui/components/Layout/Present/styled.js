import styled from 'styled-components';

export const Wrapper = styled.div`
  display: block;
`;

export const Cotainer = styled.div`
  display: block;
  height: auto;
  padding-top: 104px;
  padding-bottom: ${p => (p.footer ? '80px' : 0)};
`;

export const Content = styled.div`
  -webkit-overflow-scrolling: touch;
  overflow: auto;
`;
