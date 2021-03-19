import styled from 'styled-components';
import { Request } from 'client/ui/components/Footer/Request';
import {
  FONTS,
  PALETTE,
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
  width: 100%;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    max-width: ${BREAKPOINTS.large};
  }
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
  left: 27px;
  cursor: pointer;

  > svg {
    width: 23px;
    height: 23px;
    margin-right: 4px;

    path {
      fill: ${PALETTE.green1};
    }
  }

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    left: 112px;
  }
`;

export const Parts = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Part = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 40px 27px;
  background-color: ${PALETTE.grey11};

  img {
    margin-bottom: 22px;
  }

  &:first-child {
    padding-top: 131px;
  }

  &:nth-child(2n) {
    background-color: ${PALETTE.white};
  }

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    flex-direction: row;
    padding: 100px 124px 78px 119px;

    img {
      margin-right: 77px;
      margin-bottom: 0;
    }

    &:first-child {
      padding-top: 150px;
    }

    &:nth-child(2n) {
      flex-direction: row-reverse;
      justify-content: flex-end;

      img {
        margin-right: 0;
      }
    }
  }
`;

export const PartImg = styled.img`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 310px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    width: 428px;
  }
`;

export const PartContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  > svg {
    width: 70px;
    height: 70px;
    margin-bottom: 44px;

    path {
      fill: ${PALETTE.green1};
    }
  }

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    width: 692px;
  }
`;

export const PartTitle = styled.h3`
  font-family: ${FONTS.bold};
  font-size: 20px;
  margin: 0;
  margin-bottom: 24px;
  white-space: pre-line;
`;

export const PartDescription = styled.p`
  font-family: ${FONTS.regular};
  font-size: 16px;
  line-height: 20px;
  white-space: pre-line;
  text-align: justify;
  margin: 0;
  color: ${PALETTE.grey22};
`;

export const FormBlock = styled.div`
  padding: 50px 24px 32px;
  background-color: ${PALETTE.grey11};

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    padding: 78px 104px 90px 112px;
  }
`;

export const RequestStyled = styled(Request)`
  display: block;
`;
