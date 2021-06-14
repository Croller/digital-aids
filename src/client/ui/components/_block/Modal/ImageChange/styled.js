import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button';
import { FONTS, PALETTE, THEME } from 'client/style/constants';

export const Wrapper = styled.div`
  position: relative;
  border-radius: ${THEME.borderRadiusL};
  background-color: ${PALETTE.white};
  padding: 32px 0 22px;
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const CloseButton = styled(Button)`
  position: absolute;
  width: auto;
  height: auto;
  top: 14px;
  right: 14px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  > svg {
    width: 22px;
    height: 22px;

    path {
      fill: ${PALETTE.grey1};
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h4`
  white-space: pre-line;
  font-family: ${FONTS.semiBold};
  font-size: 18px;
  text-align: center;
  margin-bottom: 24px;
`;

export const Controls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  button {
    &:not(:last-child) {
      margin-right: 22px;
    }
  }
`;

export const Ok = styled(Button)`
  width: 180px;
  height: 42px;
  background-color: ${PALETTE.green1};
  color: ${PALETTE.white};
  text-transform: uppercase;
  font-size: 14px;
  font-family: ${FONTS.semiBold};
  border-radius: ${THEME.borderRadiusL};
`;

export const Cancel = styled(Button)`
  width: 180px;
  height: 42px;
  background-color: ${PALETTE.grey28};
  color: ${PALETTE.grey12};
  text-transform: uppercase;
  font-size: 14px;
  font-family: ${FONTS.semiBold};
  border-radius: ${THEME.borderRadiusL};
`;
