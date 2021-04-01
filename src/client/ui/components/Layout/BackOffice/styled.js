import styled from 'styled-components';

export const Wrapper = styled.div`
  display: block;
`;

export const Cotainer = styled.div`
  display: block;
  height: auto;
  padding-top: 97px;
`;

export const Content = styled.div`
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  width: ${p => (p.sidebar ? 'calc(100% - 245px)' : '100%')};
  margin-left: ${p => (p.sidebar ? '245px' : '0')};
  display: flex;
  justify-content: center;
`;

export const Block = styled.div`
  width: 100%;
  max-width: 1440px;
`;
