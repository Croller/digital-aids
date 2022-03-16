import styled from 'styled-components';
import { ScrollHideBlock } from 'client/ui/components/_base/ScrollHideBlock';
import {
  PALETTE,
  Z_INDEX,
  THEME,
  FONTS,
} from 'client/style/constants';

export const ScrollHideBlockStyled = styled(ScrollHideBlock)`
  position: fixed;
  z-index: ${Z_INDEX.footerMenu};
  bottom: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 80px;
  background-color: ${PALETTE.white};
  box-shadow: ${THEME.boxShadowMobileFooter};
`;

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;

`;

export const Item = styled.div`
  display: flex;
  width: 120px;
  height: 44px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    color: ${PALETTE.black};
  }

  > div > svg {
    width: 28px;
    height: 28px;

    path {
      fill: ${p => (p.active ? `${PALETTE.black}` : `${PALETTE.grey1}`)};
    }
  }

  > span {
    color: ${p => (p.active ? `${PALETTE.black}` : `${PALETTE.grey1}`)};
  }
`;

export const IconWrapper = styled.div`
  position: relative;
`;

export const CountBandage = styled.div`
  position: absolute;
  top: -6px;
  right: -9px;
  display: flex;
  min-width: 22px;
  height: 22px;
  align-items: center;
  justify-content: center;
  padding: 3px;
  background-color: ${PALETTE.red1};
  border-radius: 50%;
  color: ${PALETTE.white};
  font-family: ${FONTS.bold};
`;

export const Icon = styled.div`
  width: 28px;
  height: 28px;
`;

export const Text = styled.span`
  width: 100%;
  color: ${PALETTE.grey1};
  font-family: ${FONTS.medium};
  font-size: 13px;
  text-align: center;
  text-transform: uppercase;
`;
