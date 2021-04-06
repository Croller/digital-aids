import styled from 'styled-components';
import { FONTS, PALETTE } from 'client/style/constants';

export const Span = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  > svg {
    width: 22px;
    height: 22px;
    margin-right: 10px;

    path {
      fill: ${PALETTE.green1};
    }
  }
`;

export const Text = styled.span`
  font-size: 18px;
  font-family: ${FONTS.semiBold};
  text-transform: uppercase;
`;
