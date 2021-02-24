import styled from 'styled-components';
import { PALETTE, FONTS, THEME } from 'client/style/constants';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 36px 27px 44px 27px;
  box-shadow: ${THEME.boxShadow1};
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -20px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 40px;
  height: 41px;
  background-color: transparent;
`;

export const Title = styled.h3`
  font-size: 16px;
  font-family: ${FONTS.regular};
  margin: 0;
  margin-top: 14px;
`;

export const Hr = styled.hr`
  margin: 14px 0;
  border: 0.4px solid ${PALETTE.grey7};
`;

export const Description = styled.p`
  font-size: 14px;
  font-family: ${FONTS.medium};
  color: ${PALETTE.grey5};
  text-align: center;
  white-space: pre-line;
  margin: 0;
`;
