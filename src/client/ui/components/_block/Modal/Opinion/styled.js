import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button';
import { FONTS, PALETTE } from 'client/style/constants';

export const Wrapper = styled.div`
  position: relative;
  border-radius: 12px;
  background-color: ${PALETTE.white};
  padding: 31px 0 29px;
  width: 320px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;

  > svg {
    width: 50px;
    height: 50px;
    margin-bottom: 20px;

    path {
      fill: ${PALETTE.green1};
    }
  }
`;

export const Description = styled.div`
  white-space: pre-line;
  font-family: ${FONTS.medium};
  font-size: 18px;
  text-align: center;
  margin-bottom: 34px;
`;

export const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Ok = styled(Button)`
  height: 48px;
  width: 144px;
  background-color: ${PALETTE.green1};
  color: ${PALETTE.white};
  text-transform: uppercase;
  margin-bottom: 16px;
  font-size: 16px;
`;

export const Cancel = styled(Button)`
  height: 48px;
  width: 144px;
  text-transform: uppercase;
  font-size: 16px;
`;
