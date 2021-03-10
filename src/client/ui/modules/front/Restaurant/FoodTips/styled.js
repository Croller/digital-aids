import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button/Btn';
import {
  PALETTE,
  FONTS,
  THEME,
  Z_INDEX,
} from 'client/style/constants';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { DontWaste } from 'client/ui/components/Footer/DontWaste';

export const Wrapper = styled.div`
  display: block;
  position: relative;
`;

export const CloseButton = styled(Button)`
  position: absolute;
  top: 21px;
  right: 29px;
  width: 20px;
  height: 20px;
  padding: 0;
  background-color: transparent;
  z-index: 25;

  > svg {
    width: 20px;
    height: 20px;

    path {
      fill: ${PALETTE.white};
    }
  }
`;

export const Slider = styled(Carousel)`
  width: 100%;

  .carousel-status {
    display: none;
  }

  .slide {
    text-align: left !important;
    background: transparent !important;
  }

  .control-dots {
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: auto !important;
    top: 280px !important;
    bottom: unset !important;

    .dot {
      box-shadow: none !important;
      background: ${PALETTE.grey17} !important;

      &.selected {
        background: ${PALETTE.green1} !important;
      }
    }
  }
`;

export const ImgWrapper = styled.div`
  display: block;
  position: relative;
`;

export const Img = styled.img`
  display: block;
  height: 273px;
`;

export const Dish = styled.h2`
  position: absolute;
  bottom: 22px;
  left: 28px;
  font-size: 20px;
  font-family: ${FONTS.semiBold};
  color: ${PALETTE.white};
  margin: 0;
  width: 100%;
  z-index: ${Z_INDEX.header};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 44px 28px 0 ;
  margin-top: 0;
  z-index: 25;
`;

export const Description = styled.p`
  font-size: 16px;
  font-family: ${FONTS.regular};
  margin: 0;
  margin-bottom: 18px;
  line-height: 26px;
`;

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  width: 100%;
`;

export const Total = styled.span`
  color: ${PALETTE.grey4};
  font-family: ${FONTS.bold};
  font-size: 14px;
  text-transform: uppercase;
`;

export const Price = styled.span`
  font-size: 18px;
  font-family: ${FONTS.bold};
  margin-right: 0;
`;

export const AddButton = styled(Button)`
  width: 206;
  height: 48px;
  font-size: 16px;
  font-family: ${FONTS.medium};
  text-transform: uppercase;
  margin-bottom: 30px;
  box-shadow: ${THEME.boxShadow1};
  color: ${p => (p.added ? `${PALETTE.white}` : `${PALETTE.black}`)};
  background-color: ${p => (p.added ? `${PALETTE.black}` : `${PALETTE.grey2}`)};
`;

export const DontWasteStyled = styled(DontWaste)`
  padding-bottom: 0;
`;
