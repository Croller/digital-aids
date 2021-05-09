import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button';
import { FONTS, PALETTE } from 'client/style/constants';

export const Wrapper = styled.div`
  position: relative;
  border-radius: 12px;
  background-color: ${PALETTE.white};
  padding: 30px 12px 44px;
  width: 306px;

`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > svg {
    width: 50px;
    height: 50px;
    margin-bottom: 20px;

    path {
      fill: ${PALETTE.green1};
    }
  }
`;

export const Title = styled.div`
  white-space: pre-line;
  font-family: ${FONTS.medium};
  font-size: 18px;
  text-align: center;
  margin-bottom: 18px;
`;

export const Description = styled.div`
  white-space: pre-line;
  font-family: ${FONTS.semiBold};
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
  width: 74%;
  background-color: ${PALETTE.green1};
  color: ${PALETTE.white};
  text-transform: uppercase;
  margin-bottom: 16px;
  font-size: 16px;
  font-family: ${FONTS.semiBold};
`;

export const Cancel = styled(Button)`
  height: 48px;
  width: 74%;
  text-transform: uppercase;
  font-size: 16px;
  font-family: ${FONTS.semiBold};
`;
