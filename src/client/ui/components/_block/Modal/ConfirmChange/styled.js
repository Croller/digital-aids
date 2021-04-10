import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button';
import { FONTS, PALETTE, THEME } from 'client/style/constants';

export const Wrapper = styled.div`
  position: relative;
  border-radius: ${THEME.borderRadiusL};
  background-color: ${PALETTE.white};
  padding: 50px 0 44px;
  width: 595px;
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
      fill: ${PALETTE.red1};
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Icon = styled.span`
  margin-bottom: 34px;

  svg {
    width: 84px;
    height: 84px;

    path {
      fill: ${PALETTE.grey28};
    }
  }
`;

export const Title = styled.h4`
  white-space: pre-line;
  font-family: ${FONTS.semiBold};
  font-size: 18px;
  text-align: center;
  margin-bottom: 41px;
`;

export const Controls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 44px;

  button {
    &:not(:last-child) {
      margin-right: 22px;
    }
  }
`;

export const Ok = styled(Button)`
  height: 62px;
  width: 206px;
  background-color: ${PALETTE.green1};
  color: ${PALETTE.white};
  text-transform: uppercase;
  font-size: 18px;
  font-family: ${FONTS.semiBold};
  border-radius: ${THEME.borderRadiusL};
`;

export const Cancel = styled(Button)`
  height: 62px;
  width: 206px;
  background-color: ${PALETTE.grey28};
  color: ${PALETTE.grey12};
  text-transform: uppercase;
  font-size: 18px;
  font-family: ${FONTS.semiBold};
  border-radius: ${THEME.borderRadiusL};
`;
