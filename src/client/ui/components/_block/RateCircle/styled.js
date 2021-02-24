import styled from 'styled-components';
import { PALETTE } from 'client/style/constants';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const CircleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid ${PALETTE.green1};
  background-color: ${PALETTE.white};
`;

export const Circle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${PALETTE.green1};
`;
