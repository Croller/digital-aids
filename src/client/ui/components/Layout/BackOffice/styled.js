import styled from 'styled-components';

export const Wrapper = styled.div`
  display: block;
`;

export const Cotainer = styled.div`
  display: block;
  height: auto;
`;

export const Content = styled.div`
  width: ${p => (p.sidebar ? 'calc(100% - 245px)' : '100%')};
  padding-top: 97px;
  margin-left: ${p => (p.sidebar ? '245px' : '0')};
  display: flex;
  justify-content: center;
`;

export const Block = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 30px 36px 0 22px;
`;
