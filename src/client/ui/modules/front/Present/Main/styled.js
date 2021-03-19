import styled from 'styled-components';
import {
  FONTS,
  PALETTE,
  THEME,
  BREAKPOINTS,
} from 'client/style/constants';
import { Button } from 'client/ui/components/_ui/Button/Btn';
import { Collapse } from 'client/ui/components/_ui/Collapse';
import {
  BackgroundBlock1Png,
  BackgroundBlock2Png,
  Digital1Png,
  RedLine1Svg,
  RedLine2Svg,
} from 'client/assets/images';
import { Request } from 'client/ui/components/Footer/Request';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    max-width: ${BREAKPOINTS.large};
  }
`;

export const PresentBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: url(${BackgroundBlock2Png}) no-repeat top;
  background-size: auto 750px;

  /* background-position: 0 50px; */

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    width: 1440px;
    height: 527px;
    flex-direction: row;
    background: url(${BackgroundBlock1Png}) no-repeat right;
    background-size: auto;
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  order: 3;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10%;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    display: block;
    order: 1;
    margin: 40px 70px 31px 0;
  }
`;

export const PhoneImage = styled.img`
  width: 212px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    width: 292px;
  }
`;

export const PresentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  order: 1;
  padding: 50px 27px 33px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    display: block;
    width: 384px;
    margin-right: 42px;
    order: 2;
    padding: unset;
  }
`;

export const PresentTitle = styled.h3`
  font-family: ${FONTS.bold};
  font-size: 22px;
  line-height: 40px;
  margin: 0;
  margin-top: 0;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    font-size: 24px;
    margin-top: 100px;
  }
`;

export const PresentQuestion = styled.span`
  font-family: ${FONTS.bold};
  font-size: 24px;
  color: ${PALETTE.green1};
`;

export const PresentDescription = styled.p`
  font-family: ${FONTS.medium};
  font-size: 16px;
  line-height: 22px;
  margin: 22px 0 5px;
  white-space: pre-line;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    margin: 24px 0 5px;
  }
`;

export const PresentTime = styled.span`
  font-family: ${FONTS.medium};
  font-size: 16px;
  color: ${PALETTE.green1};
`;

export const PresentButton = styled(Button)`
  width: 100%;
  height: 52px;
  background-color: ${PALETTE.green1};
  font-family: ${FONTS.semiBold};
  font-size: 16px;
  color: ${PALETTE.white};
  text-transform: uppercase;
  margin-top: 22px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    width: 284px;
    margin-top: 70px;
  }
`;

export const QRCodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  order: 2;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    width: 376px;
    order: 3;
  }
`;

export const QRCodeTitle = styled.h3`
  font-family: ${FONTS.semiBold};
  font-size: 14px;
  margin-bottom: 16px;
  text-align: center;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    font-size: 18px;
    margin: 100px 0 20px;
    text-align: center;
  }
`;

export const QRCodeLanguage = styled.span`
  font-family: ${FONTS.medium};
  font-size: 18px;
  margin: 20px 0 16px;
  text-transform: uppercase;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    margin: 18px 0 10px;
  }
`;

export const QRCodeLanguageList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 0;
  margin-top: 0;
  margin-bottom: 26px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    margin-bottom: unset;
  }
`;

export const QRCodeLanguageItem = styled.li`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: ${PALETTE.white};
  box-shadow: ${THEME.boxShadow1};
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 14px;
  }

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    width: 51px;
    height: 51px;

    &:not(:last-child) {
      margin-right: 18px;
    }
  }
`;

export const OfertaWrapper = styled.div`
  position: relative;
  margin-top: -46px;
  margin-left: 28px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    position: absolute;
    margin-top: -72px;
    margin-left: -48px;
  }
`;

export const OfertaContent = styled.div`
  position: absolute;
  top: 44px;
  left: 22px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    top: 50px;
    left: 44px;
  }
`;

export const OfertaTitle = styled.h3`
  font-family: ${FONTS.bold};
  font-size: 16px;
  margin: 0;
  margin-bottom: 6px;
  text-transform: uppercase;
  color: ${PALETTE.white};

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    font-size: 18px;
  }
`;

export const OfertaDescription = styled.p`
  font-family: ${FONTS.medium};
  font-size: 13px;
  line-height: 18px;
  text-transform: uppercase;
  color: ${PALETTE.white};
  white-space: pre-line;
  margin: 0;
  width: 308px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    width: auto;
    font-size: 16px;
    line-height: 20px;
  }
`;

export const RedLine1SvgStyled = styled(RedLine1Svg)`
  display: none;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    display: block;
  }
`;

export const RedLine2SvgStyled = styled(RedLine2Svg)`
  display: block;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    display: none;
  }
`;

export const DigitalBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -60px;
  background-color: ${PALETTE.grey11};
  padding: 98px 27px 0;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    margin-top: -32px;
    flex-direction: row;
    padding: 152px 0 12px 112px;
  }
`;

export const DigitalWithImage = styled.div`
  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    width: 546px;
    margin-right: 52px;
  }
`;

export const DigitalTitle = styled.h3`
  font-family: ${FONTS.bold};
  font-size: 22px;
  line-height: 32px;
  margin: 0;
  margin-bottom: 10px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    font-size: 28px;
    line-height: 40px;
  }
`;

export const DigitalDescription = styled.p`
  font-family: ${FONTS.medium};
  font-size: 16px;
  white-space: pre-line;
  margin: 0;
  margin-bottom: 16px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    font-size: 20px;
    margin-bottom: 26px;
  }
`;

export const DigitalImage = styled.div`
  height: 285px;
  background: url(${Digital1Png}) 546px 309px;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 16px;
  margin-bottom: 28px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    width: 546px;
    height: 309px;
    background: url(${Digital1Png}) 546px 309px;
    margin-bottom: 0;
  }
`;

export const SpanGreen = styled.span`
  color: ${PALETTE.green1};
  white-space: pre-line;
`;

export const SpanBlack = styled.span`
  color: ${PALETTE.black};
  font-family: ${FONTS.bold};
  white-space: pre-line;
`;

export const DigitalOptions = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    width: 590px;
    flex-direction: row;
  }
`;

export const DigitalOption = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 0 48%;
  margin-bottom: 47px;

  svg {
    width: 68px;
    height: 68px;
    margin-bottom: 22px;

    path {
      fill: ${PALETTE.green1};
    }
  }

  &:nth-child(2n+1) {
    margin-right: 22px;
  }
`;

export const DigitalOptionTitle = styled.h4`
  font-family: ${FONTS.bold};
  font-size: 20px;
  margin: 0;
  margin-bottom: 14px;
`;

export const DigitalOptionDescription = styled.p`
  font-family: ${FONTS.medium};
  font-size: 14px;
  white-space: pre-line;
  margin: 0;
  color: ${PALETTE.grey20};
`;

export const QuestionsBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 55px 27px 45px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    padding: 78px 80px 34px 112px;
  }
`;

export const QuestionsBlockTitle = styled.h3`
  font-family: ${FONTS.bold};
  font-size: 22px;
  margin: 0;
  margin-bottom: 34px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    font-size: 28px;
    margin-bottom: 32px;
  }
`;

export const QuestionsBlockWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const QuestionsBlockCol = styled.div`
  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    flex: 0 48%;

    &:nth-child(2n+1) {
      margin-right: 22px;
    }
  }
`;

export const CollapseStyled = styled(Collapse)`
  margin-bottom: 22px;

  p {
    margin: 0;
    font-size: 14px;
    line-height: 20px;
  }

  a {
    text-decoration: underline;
  }

  .bold {
    font-family: ${FONTS.bold};
  }

  .green {
    color: ${PALETTE.green1};
  }
`;

export const QuestionCollTitle = styled.div`
  font-family: ${FONTS.medium};
  font-size: 16px;
  display: flex;
  align-items: center;

  > div > svg {
    width: 35px;
    height: 35px;
    margin-right: 16px;

    path {
      fill: ${PALETTE.green1};
    }
  }

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    font-size: 16px;

    > svg {
      width: 36px;
      height: 36px;
    }
  }
`;

export const IconBlock = styled.div`
  display: block;
`;

export const QuectionHtml = styled.div`
  display: block;
`;

export const ClientBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 27px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    padding: 78px 60px 34px 112px;
  }
`;

export const ClientBlockTitle = styled.h3`
  font-family: ${FONTS.bold};
  font-size: 22px;
  margin: 0;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    font-size: 28px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const ClientCarouselControl = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 32px;

  > svg {
    width: 32px;
    height: 32px;
    transform: rotate(180deg);
    cursor: pointer;

    path {
      fill: ${PALETTE.green1};
    }

    &:first-child {
      margin-right: 40px;
      transform: rotate(0deg);
    }
  }

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    margin-top: 0;
    margin-right: 30px;
  }
`;

export const CarouselStyled = styled(Slider)`
  display: block;
`;

export const BlockClient = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    padding: 10px;
  }
`;

export const Client = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    flex: 0 48%;

    &:nth-child(2n+1) {
      margin-right: 22px;
    }
  }
`;

export const ClientHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 10px;
  height: 92px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    margin-bottom: 42px;
    align-items: center;
    height: auto;
  }
`;

export const ClientImg = styled.img`
  display: block;
  margin-right: 22px;
  width: 71px;
  height: 71px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    width: auto;
    height: auto;
  }
`;

export const ClientName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ClientWho = styled.h5`
  font-family: ${FONTS.semiBold};
  font-size: 16px;
  margin: 0;
  margin-bottom: 8px;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    font-size: 18px;
  }
`;

export const ClientPosition = styled.span`
  font-family: ${FONTS.lightItalic};
  font-size: 14px;
  white-space: pre-line;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    font-size: 16px;
  }
`;

export const ClientContent = styled.div`
  position: relative;
  padding: 42px 22px 24px;
  box-shadow: ${THEME.boxShadow1};
  border-radius: ${THEME.borderRadius};
  min-height: 506px;
  height: auto;

  > svg {
    width: 52px;
    height: 43px;
    position: absolute;
    z-index: -2;
    transform: rotate(180deg);

    path {
      fill: ${PALETTE.grey21};
    }

    &:first-child {
      top: 24px;
      left: 16px;
      transform: rotate(180deg);
    }

    &:last-child {
      bottom: 10px;
      right: 16px;
      transform: rotate(0deg);
    }
  }

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    height: 266px;
    padding: 38px 68px 46px 44px;

    > svg {
      width: 80px;
      height: 66px;
    }
  }
`;

export const ClientContentTitle = styled.h5`
  font-family: ${FONTS.semiBold};
  font-size: 20px;
  margin: 0;
  margin-bottom: 16px;
`;

export const ClientContentDescription = styled.p`
  font-family: ${FONTS.regular};
  font-size: 14px;
  line-height: 20px;
  margin: 0;
  color: ${PALETTE.grey20};
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
