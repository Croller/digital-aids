import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button';
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
  width: 306px;
  border-radius: ${THEME.borderRadiusM};
  background-color: ${PALETTE.white};
  padding: 47px 23px 33px;
  z-index: ${Z_INDEX.modal};
  max-width: ${BREAKPOINTS.large};
  margin: 0 auto;
  box-shadow: ${THEME.boxShadow1};

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    width: auto;
    padding: 47px 59px 37px;
  }
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
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    flex-direction: row;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    margin-right: 54px;
  }
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
  margin-bottom: 20px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    margin-bottom: 0;
  }
`;

export const AcceptButton = styled(Button)`
  background-color: ${PALETTE.green1};
  font-family: ${FONTS.semiBold};
  height: 54px;
  width: 100%;
  text-transform: uppercase;
  color: ${PALETTE.white};

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    width: 446px;
  }
`;
