import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button/Btn';
import { FONTS, PALETTE } from 'client/style/constants';

export const Wrapper = styled.div`
  position: relative;
  border-radius: 12px;
  background-color: ${PALETTE.white};
  padding: 37px 0 33px;
  width: 306px;

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > svg {
    margin-bottom: 30px;
  }
`;

export const Title = styled.div`
  white-space: pre-line;
  font-family: ${FONTS.medium};
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`;

export const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Ok = styled(Button)`
  min-height: 48px;
  min-width: 144px;
  width: auto;
  background-color: ${PALETTE.grey2};
  color: ${PALETTE.black};
  text-transform: uppercase;
  margin-bottom: 16px;
  font-size: 16px;
`;

export const Cancel = styled(Button)`
  min-height: 48px;
  min-width: 144px;
  width: auto;
  text-transform: uppercase;
  font-size: 16px;
  background-color: ${PALETTE.black};
  color: ${PALETTE.white};
`;
