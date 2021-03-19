import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button/Btn';
import {
  PALETTE,
  FONTS,
  THEME,
  Z_INDEX,
} from 'client/style/constants';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
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

export const CarouselControl = styled.div`
  position: absolute;
  right: 16px;
  top: 222px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 25;

  > svg {
    width: 32px;
    height: 32px;
    transform: rotate(180deg);
    cursor: pointer;

    path {
      fill: ${PALETTE.white};
    }

    &:first-child {
      margin-right: 40px;
      transform: rotate(0deg);
    }
  }
`;

export const Carousel = styled(Slider)`
  display: block;

  .slick-dots {
    position: absolute;
    top: 288px;
    bottom: unset;

    button {
      &::before {
        opacity: 1;
        color: ${PALETTE.grey17};
      }
    }

    .slick-active {
      button {
        &::before {
          color: ${PALETTE.green1};
        }
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
  width: 100%;
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
