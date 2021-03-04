import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button/Btn';
import { FONTS, PALETTE } from 'client/style/constants';

export const Wrapper = styled.div`
  position: relative;
  border-radius: 12px;
  background-color: ${PALETTE.white};
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
  margin-bottom: 41px;
  width: 100%;
  height: 196px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`;

export const Title = styled.div`
  white-space: pre-line;
  font-family: ${FONTS.semiBold};
  font-size: 20px;
  text-align: center;
  margin-bottom: 16px;
  text-transform: uppercase;
  color: ${PALETTE.green1};
`;

export const Description = styled.div`
  white-space: pre-line;
  font-family: ${FONTS.regular};
  font-size: 16px;
  text-align: center;
  margin-bottom: 24px;
  padding: 0 15px;
`;

export const PriceWrapper = styled.div`
  background-color: ${PALETTE.grey18};
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  padding: 23px 15px 23px;
`;

export const Price = styled.div`
  white-space: pre-line;
  font-family: ${FONTS.semiBold};
  font-size: 16px;
  text-align: center;
  text-transform: uppercase;
`;

export const Person = styled.div`
  white-space: pre-line;
  font-family: ${FONTS.medium};
  font-size: 16px;
  text-align: center;
`;
