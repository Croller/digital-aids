import styled from 'styled-components';
import { FONTS } from 'client/style/constants';

export const Span = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  > svg {
    width: 22px;
    height: 22px;
    margin-right: 10px;
  }
`;

export const Text = styled.span`
  font-size: 18px;
  font-family: ${FONTS.semiBold};
`;
