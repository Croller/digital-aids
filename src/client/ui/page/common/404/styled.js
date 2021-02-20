import styled from 'styled-components';
import { PALETTE } from 'client/style/constants';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const Logo = styled.div`
  margin-top: 45px;
  margin-bottom: 100px;
  height: 62px;
  width: 186px;
  border: 1px solid ${PALETTE.grey1};
`;
