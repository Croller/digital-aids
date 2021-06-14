import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button';
import { THEME, PALETTE, FONTS } from 'client/style/constants';

export const Wrapper = styled.div`
  display: block;
  padding: 22px 27px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ButtonStyled = styled(Button)`
  height: 60px;
  box-shadow: ${THEME.boxShadow1};
  border-radius: ${THEME.borderRadiusM};
  background-color: ${PALETTE.white};

  > svg {
    width: 24px;
    height: 24px;
    margin-right: 13px;

    path {
      fill: ${PALETTE.grey13};
    }
  }

  &:not(:last-child) {
    margin-bottom: 12px;
  }

  &:last-child {
    background-color: ${PALETTE.green1};
    color: ${PALETTE.white};
    text-transform: uppercase;
  }

  &:nth-child(4) {
    background-color: ${PALETTE.grey2};
  }
`;

export const ScanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 28px 0;
`;

export const Title = styled.h4`
  font-family: ${FONTS.semiBold};
  font-size: 18px;
  margin: 0;
  margin-bottom: 30px;
  text-align: center;
  text-transform: uppercase;
  white-space: pre-line;
`;

export const Description = styled.p`
  font-family: ${FONTS.medium};
  font-size: 14px;
  margin: 0;
  padding: 0;
  margin-bottom: 34px;
  text-align: center;
  white-space: pre-line;
`;

export const ScanButton = styled(Button)`
  height: 48px;
  box-shadow: ${THEME.boxShadow1};
  border-radius: ${THEME.borderRadiusM};
  background-color: ${PALETTE.green1};
  color: ${PALETTE.white};
  font-size: 16px;
  font-family: ${FONTS.semiBold};

  > svg {
    width: 24px;
    height: 24px;
    margin-right: 13px;

    path {
      fill: ${PALETTE.white};
    }
  }
`;

