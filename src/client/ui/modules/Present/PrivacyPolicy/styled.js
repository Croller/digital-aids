import styled from 'styled-components';
import {
  FONTS,
  PALETTE,
  BREAKPOINTS,
} from 'client/style/constants';

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${BREAKPOINTS.large};
  padding: 36px 119px 148px 121px;
`;

export const Title = styled.h3`
  font-family: ${FONTS.bold};
  font-size: 20px;
  margin: 0;
  margin-bottom: 35px;
`;

export const Description = styled.p`
  font-family: ${FONTS.regular};
  font-size: 16px;
  margin: 0;
  color: ${PALETTE.grey20};
  white-space: pre-line;
`;
