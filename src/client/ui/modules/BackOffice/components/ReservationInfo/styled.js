import styled from 'styled-components';
import {
  FONTS,
  PALETTE,
  THEME,
  BREAKPOINTS,
} from 'client/style/constants';
import { Button } from 'client/ui/components/_ui/Button';
import { IconText } from 'client/ui/components/_block/IconText';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background-color: ${PALETTE.white};
  border-radius: ${THEME.borderRadiusL};
  box-shadow: ${THEME.boxShadow2};
  padding: 22px 23px 20px 24px;
  margin-bottom: 22px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    height: auto;
  }
`;

export const Person = styled(IconText)`
  font-size: 16px;
  font-family: ${FONTS.medium};
  min-width: 180px;

  > span > svg {
    width: 26px;
    height: 26px;
    margin-right: 16px;

    path: {
      fill: ${PALETTE.green1};
    }
  }
`;

export const Contact = styled(IconText)`
  font-size: 16px;
  font-family: ${FONTS.medium};

  > span > svg {
    width: 26px;
    height: 26px;
    margin-right: 16px;

    path: {
      fill: ${PALETTE.green1};
    }
  }
`;

export const Date = styled(IconText)`
  font-size: 14px;
  font-family: ${FONTS.medium};
  margin-right: 100px;
  margin-left: auto;

  > span > svg {
    width: 26px;
    height: 26px;
    margin-right: 16px;

    path: {
      fill: ${PALETTE.green1};
    }
  }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 82px;
`;

export const Control = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 32px;
  height: 32px;
  background-color: ${PALETTE.grey26};
  border-radius: ${THEME.borderRadiusS};

  &:not(:last-child) {
    margin-right: 18px;
  }

  > svg {
    width: 18px;
    height: 100%;

    path {
      fill: ${PALETTE.black1};
    }
  }
`;

export const Status = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 32px;
  height: 32px;
  background-color: transparent;
  border-radius: ${THEME.borderRadiusS};
  cursor: default;

  > svg {
    width: 24px;
    height: 100%;

    path {
      fill: ${PALETTE.black1};
    }
  }
`;
