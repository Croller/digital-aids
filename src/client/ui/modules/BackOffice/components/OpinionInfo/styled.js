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
  flex-direction: column;
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

export const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Rate = styled(IconText)`
  font-size: 18px;
  font-family: ${FONTS.medium};
  min-width: 120px;

  > span > svg {
    width: 26px;
    height: 26px;
    margin-right: 16px;

    path: {
      fill: ${PALETTE.green1};
    }
  }
`;

export const ValuationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Valuation = styled(Button)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 84px;
  font-family: ${FONTS.regular};
  background-color: transparent;
  color: ${PALETTE.black};
`;

export const ValuationText = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  white-space: pre-line;
  width: 108px;
  font-size: 12px;
`;

export const EmojiWrapper = styled.h4`
  margin: 0;
  margin-bottom: -6px;
  margin-top: -10px;
  font-size: 40px;
`;

export const Date = styled(IconText)`
  font-size: 14px;
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

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
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

export const Hr = styled.hr`
  margin: 18px 0;
  border: 1px solid ${PALETTE.grey23};
`;

export const Comment = styled.div`
  font-size: 14px;
  font-family: ${FONTS.medium};
`;
