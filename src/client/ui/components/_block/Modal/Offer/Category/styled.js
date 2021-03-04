import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button/Btn';
import { FONTS, PALETTE } from 'client/style/constants';

export const Wrapper = styled.div`
  position: relative;
  border-radius: 12px;
  background-color: ${PALETTE.white};
  padding: 0 0 21px;
  width: 306px;
  margin: 20% auto;
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
  background-color: ${PALETTE.white};

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
`;

export const Image = styled.img`
  margin-bottom: 16px;
  width: 100%;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`;

export const Description = styled.div`
  white-space: pre-line;
  font-family: ${FONTS.semiBold};
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;
`;

export const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Ok = styled(Button)`
  height: 48px;
  width: 238px;
  background-color: ${PALETTE.green1};
  color: ${PALETTE.white};
  text-transform: uppercase;
  margin-bottom: 16px;
  font-size: 16px;
  font-family: ${FONTS.bold};
`;
