import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button/Btn';
import {
  FONTS,
  PALETTE,
  Z_INDEX,
  THEME,
  BREAKPOINTS,
} from 'client/style/constants';

export const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: ${THEME.borderRadius};
  background-color: ${PALETTE.white};
  padding: 47px 59px 37px;
  z-index: ${Z_INDEX.modal};
  width: ${BREAKPOINTS.large};
  margin: 0 auto;
  box-shadow: ${THEME.boxShadow1};
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
  background-color: transparent;

  > svg {
    width: 20px;
    height: 20px;

    path {
      fill: ${PALETTE.grey1};
    }
  }
`;

export const Conatainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 54px;
`;

export const Title = styled.h3`
  margin: 0;
  font-family: ${FONTS.bold};
  font-size: 20px;
  margin-bottom: 18px;
`;

export const Description = styled.p`
  color: ${PALETTE.grey19};
  font-size: 14px;
  font-family: ${FONTS.regular};
  line-height: 20px;
  margin: 0;
`;

export const AcceptButton = styled(Button)`
  background-color: ${PALETTE.green1};
  font-family: ${FONTS.semiBold};
  height: 54px;
  width: 446px;
  text-transform: uppercase;
  color: ${PALETTE.white};
`;
