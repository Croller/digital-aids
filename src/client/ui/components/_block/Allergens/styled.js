import styled from 'styled-components';
import { PALETTE, FONTS } from 'client/style/constants';

export const Wrapper = styled.div`
  display: block;
`;

export const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  margin-bottom: 44px;
`;

export const Item = styled.li`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const IconWrapper = styled.div`
  width: 37px;
  height: 37px;
  margin-right: 14px;
`;

export const Text = styled.span`
  font-size: 16px;
  font-family: ${FONTS.medium};
  color: ${PALETTE.black};
`;

export const Description = styled.p`
  font-size: 16px;
  font-family: ${FONTS.bold};
  white-space: pre-line;
  text-align: justify;
`;
