import styled from 'styled-components';
import { Request } from 'client/ui/components/Footer/Request';
import {
  FONTS,
  PALETTE,
  THEME,
  BREAKPOINTS,
} from 'client/style/constants';

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: ${BREAKPOINTS.large};
`;

export const Control = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: ${FONTS.medium};
  font-size: 16px;
  color: ${PALETTE.grey20};
  text-transform: uppercase;
  position: absolute;
  top: 40px;
  left: 112px;

  > svg {
    width: 23px;
    height: 23px;
    margin-right: 4px;

    path {
      fill: ${PALETTE.green1};
    }
  }
`;

export const Parts = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Part = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 100px 124px 78px 119px;
  background-color: ${PALETTE.grey11};

  img {
    margin-right: 40px;
  }

  &:first-child {
    padding-top: 158px;
  }

  &:nth-child(2n) {
    flex-direction: row-reverse;
    justify-content: flex-end;
    background-color: ${PALETTE.white};

    img {
      margin-right: 0;
    }
  }
`;

export const PartImg = styled.img`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

export const PartContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 692px;

  > svg {
    width: 70px;
    height: 70px;
    margin-bottom: 44px;

    path {
      fill: ${PALETTE.green1};
    }
  }
`;

export const PartTitle = styled.h3`
  font-family: ${FONTS.bold};
  font-size: 20px;
  margin: 0;
  margin-bottom: 24px;
`;

export const PartDescription = styled.p`
  font-family: ${FONTS.regular};
  font-size: 16px;
  line-height: 20px;
  white-space: pre-line;
  margin: 0;
  color: ${PALETTE.grey22};
`;

export const FormBlock = styled.div`
  display: flex;
  padding: 78px 119px 90px 121px;
  background-color: ${PALETTE.grey11};
`;

export const RequestStyled = styled(Request)`
  display: block;
`;
