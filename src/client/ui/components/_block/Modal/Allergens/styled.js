import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button';
import { FONTS, PALETTE } from 'client/style/constants';

export const Wrapper = styled.div`
  position: relative;
  border-radius: 12px;
  background-color: ${PALETTE.white};
  padding: 24px 22px 36px;
  width: 262px;

`;

export const Title = styled.div`
  width: 80%;
  margin: 0;
  font-family: ${FONTS.bold};
  font-size: 16px;
  margin-bottom: 27px;
`;

export const CloseButton = styled(Button)`
  position: absolute;
  top: 18px;
  right: 18px;
  width: 28px;
  height: 28px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  > svg {
    width: 16px;
    height: 16px;

    path {
      fill: ${PALETTE.grey1};
    }
  }
`;

export const Content = styled.div`
  p {
    font-size: 16px;
    font-family: ${FONTS.regular};
  }
`;
