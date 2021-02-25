import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button/Btn';
import { ScrollHideBlock } from 'client/ui/components/_base/ScrollHideBlock';
import {
  PALETTE,
  Z_INDEX,
  THEME,
  FONTS,
} from 'client/style/constants';

export const Wrapper = styled.div`
  padding: 20px 27px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const Title = styled.h3`
  font-family: ${FONTS.bold};
  font-size: 20px;
  text-transform: uppercase;
  margin: 0;
`;

export const TrashButton = styled(Button)`
  background-color: transparent;
  width: auto;

  > svg {
    width: 22px;
    height: 24px;

    path {
      fill: ${PALETTE.grey3}
    }
  }
`;

export const Container = styled.div`
  height: 2400px;
`;

export const ScrollHideBlockStyled = styled(ScrollHideBlock)`
  display: block;
  position: fixed;
  left: 0;
  bottom: 80px;
  height: 80px;
  width: 100%;
  z-index: ${Z_INDEX.footerMenu + 1};
  background-color: ${PALETTE.grey11};
`;

export const TotalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 25px;
`;

export const Total = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const TotalText = styled.span`
  font-family: ${FONTS.bold};
  font-size: 16px;
  text-transform: uppercase;
`;

export const TotalSumm = styled.span`
  font-family: ${FONTS.bold};
  font-size: 18px;
`;

export const CreateButton = styled(Button)`
  height: 48px;
  width: 172px;
  color: ${PALETTE.white};
  font-size: 14px;
  font-family: ${FONTS.medium};
  background-color: ${PALETTE.grey12};
  text-transform: uppercase;
  margin-right: 0;
`;
