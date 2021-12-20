import styled from 'styled-components';
import { PALETTE } from 'client/style/base';

export const PageBuilderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContainerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FooterWrapper = styled.div`
  width: 100%;
  height: 160px;
  margin-top: 16px;
  background-color: ${PALETTE.blue1};
`;
