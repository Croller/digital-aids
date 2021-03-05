import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button/Btn';
import { FONTS, PALETTE } from 'client/style/constants';

export const Wrapper = styled.div`
  position: relative;
  border-radius: 12px;
  background-color: ${PALETTE.white};
  padding: 66px 0 54px;
  width: 306px;
  margin: 28% auto;
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
`;

export const Title = styled.div`
  white-space: pre-line;
  font-family: ${FONTS.semiBold};
  font-size: 18px;
  text-align: center;
  margin-bottom: 28px;
`;

export const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Ok = styled(Button)`
  height: 48px;
  width: 144px;
  background-color: ${PALETTE.black};
  color: ${PALETTE.white};
  text-transform: uppercase;
  margin-bottom: 22px;
  font-size: 16px;
  font-family: ${FONTS.semiBold};
`;

export const Cancel = styled(Button)`
  height: 48px;
  width: 144px;
  text-transform: uppercase;
  font-size: 16px;
  font-family: ${FONTS.semiBold};
`;
