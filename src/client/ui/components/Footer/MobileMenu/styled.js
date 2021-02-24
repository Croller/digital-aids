import styled from 'styled-components';
import { ScrollHideBlock } from 'client/ui/components/_base/ScrollHideBlock';
import {
  PALETTE,
  Z_INDEX,
  THEME,
  FONTS,
} from 'client/style/constants';

export const ScrollHideBlockStyled = styled(ScrollHideBlock)`
  display: block;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 80px;
  width: 100%;
  z-index: ${Z_INDEX.footerMenu};
  background-color: ${PALETTE.white};
  box-shadow: ${THEME.boxShadowMobileFooter};
`;

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 44px;
  cursor: pointer;

  &:hover {
    color: ${PALETTE.black};
  }

  > div > svg {
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
  right: -12px;
  top: -13px;
  border-radius: 50%;
  background-color: ${PALETTE.red1};
  min-width: 22px;
  height: 22px;
  color: ${PALETTE.white};
  font-family: ${FONTS.bold};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
`;

export const Icon = styled.div`
  width: 28px;
  height: 28px;
`;

export const Text = styled.span`
  font-family: ${FONTS.medium};
  color: ${PALETTE.grey1};
  text-align: center;
  width: 100%;
  text-transform: uppercase;
  font-size: 13px;
`;
