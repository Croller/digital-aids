import styled from 'styled-components';
import {
  FONTS,
  PALETTE,
  THEME,
  BREAKPOINTS,
} from 'client/style/constants';
import { Button } from 'client/ui/components/_ui/Button/Btn';
import { Collapse } from 'client/ui/components/_ui/Collapse';
import { BackgroundBlock1Png, Digital1Png } from 'client/assets/images';
import { Request } from 'client/ui/components/Footer/Request';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${BREAKPOINTS.large};
`;

export const PresentBlock = styled.div`
  width: 1440px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: url(${BackgroundBlock1Png}) 882px 572px no-repeat;
  background-position: right;
`;

export const ImageWrapper = styled.div`
  display: block;
  margin-left: -12px;
  margin-right: 12px;
`;

export const PhoneImage = styled.img`
  width: 418px;
`;

export const PresentWrapper = styled.div`
  display: block;
  width: 384px;
  margin-right: 42px;
`;

export const PresentTitle = styled.h3`
  font-family: ${FONTS.bold};
  font-size: 24px;
  line-height: 40px;
  margin: 0;
  margin-top: 100px;
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
  margin: 24px 0 5px;
`;

export const PresentTime = styled.span`
  font-family: ${FONTS.medium};
  font-size: 16px;
  color: ${PALETTE.green1};
`;

export const PresentButton = styled(Button)`
  width: 284px;
  height: 52px;
  background-color: ${PALETTE.green1};
  font-family: ${FONTS.semiBold};
  font-size: 16px;
  color: ${PALETTE.white};
  text-transform: uppercase;
  margin-top: 52px;
`;

export const QRCodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const QRCodeTitle = styled.h3`
  font-family: ${FONTS.semiBold};
  font-size: 18px;
  margin: 100px 0 20px;
`;

export const QRCodeLanguage = styled.span`
  font-family: ${FONTS.medium};
  font-size: 18px;
  margin: 18px 0 10px;
  text-transform: uppercase;
`;

export const QRCodeLanguageList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 0;
`;

export const QRCodeLanguageItem = styled.li`
  width: 51px;
  height: 51px;
  border-radius: 50%;
  background-color: ${PALETTE.white};
  box-shadow: ${THEME.boxShadow1};
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;

  &:not(:last-child) {
    margin-right: 18px;
  }
`;

export const OfertaWrapper = styled.div`
  position: relative;
  margin-top: -36px;
  margin-left: 98px;
`;

export const OfertaContent = styled.div`
  position: absolute;
  top: 50px;
  left: 44px;
`;

export const OfertaTitle = styled.h3`
  font-family: ${FONTS.bold};
  font-size: 18px;
  margin: 0;
  margin-bottom: 6px;
  text-transform: uppercase;
  color: ${PALETTE.white};
`;

export const OfertaDescription = styled.p`
  font-family: ${FONTS.medium};
  font-size: 16px;
  line-height: 20px;
  text-transform: uppercase;
  color: ${PALETTE.white};
  white-space: pre-line;
  margin: 0;
`;

export const DigitalBlock = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: -97px;
  padding: 152px 0 12px 112px;
  background-color: ${PALETTE.grey11};
`;

export const DigitalWithImage = styled.div`
  width: 546px;
  margin-right: 52px;
`;

export const DigitalTitle = styled.h3`
  font-family: ${FONTS.bold};
  font-size: 28px;
  line-height: 40px;
  margin: 0;
  margin-bottom: 10px;
`;

export const DigitalDescription = styled.p`
  font-family: ${FONTS.medium};
  font-size: 20px;
  white-space: pre-line;
  margin: 0;
  margin-bottom: 26px;
`;

export const DigitalImage = styled.div`
  width: 546px;
  height: 309px;
  background: url(${Digital1Png}) 546px 309px;
`;

export const SpanGreen = styled.span`
  color: ${PALETTE.green1};
`;

export const SpanBlack = styled.span`
  color: ${PALETTE.black};
  font-family: ${FONTS.bold};
`;

export const DigitalOptions = styled.div`
  width: 590px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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
  padding: 78px 80px 34px 112px;
`;

export const QuestionsBlockTitle = styled.h3`
  font-family: ${FONTS.bold};
  font-size: 28px;
  margin: 0;
  margin-bottom: 32px;
`;

export const QuestionsBlockWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const QuestionsBlockCol = styled.div`
  flex: 0 48%;

  &:nth-child(2n+1) {
    margin-right: 22px;
  }
`;

export const CollapseStyled = styled(Collapse)`
  margin-bottom: 22px;

  p {
    margin: 0;
    font-size: 14px;
    line-height: 20px;
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
  font-size: 18px;
  display: flex;
  align-items: center;

  > svg {
    width: 36px;
    height: 36px;
    margin-right: 16px;

    path {
      fill: ${PALETTE.green1};
    }
  }
`;

export const QuectionHtml = styled.div`
  display: block;
`;

export const ClientBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 78px 60px 34px 112px;
`;

export const ClientBlockTitle = styled.h3`
  font-family: ${FONTS.bold};
  font-size: 28px;
  margin: 0;
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ClientSliderControl = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 30px;

  > svg {
    width: 32px;
    height: 32px;
    transform: rotate(180deg);

    path {
      fill: ${PALETTE.green1};
    }

    &:first-child {
      margin-right: 40px;
      transform: rotate(0deg);
    }
  }
`;

export const CarouselStyled = styled(Carousel)`
  display: block;
`;

export const Block2Client = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

export const Client = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 48%;

  &:nth-child(2n+1) {
    margin-right: 22px;
  }
`;

export const ClientHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 42px;
`;

export const ClientImg = styled.img`
  display: block;
  margin-right: 22px;
`;

export const ClientName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ClientWho = styled.h5`
  font-family: ${FONTS.semiBold};
  font-size: 18px;
  margin: 0;
`;

export const ClientPosition = styled.span`
  font-family: ${FONTS.lightItalic};
  font-size: 16px;
  white-space: pre-line;
`;

export const ClientContent = styled.div`
  position: relative;
  padding: 38px 68px 46px 44px;
  box-shadow: ${THEME.boxShadow1};
  border-radius: ${THEME.borderRadius};
  height: 100%;

  > svg {
    width: 80px;
    height: 66px;
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
`;

export const ClientContentTriangle = styled.div`
  position: absolute;
  top: -38px;
  left: 0;
  width: 0;
  height: 0;
  border-bottom: 38px solid ${PALETTE.white};
  border-right: 38px solid transparent;
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
  display: flex;
  padding: 78px 104px 90px 112px;
  background-color: ${PALETTE.grey11};
`;

export const RequestStyled = styled(Request)`
  display: block;
`;
