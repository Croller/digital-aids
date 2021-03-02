import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button/Btn';
import { PALETTE, FONTS, THEME } from 'client/style/constants';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

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
  height: 217px;

  .carousel-status {
    display: none;
  }
`;

export const ImgWrapper = styled.div`
  display: block;
`;

export const Img = styled.img`
  display: block;
  height: 273px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 0 27px;
  margin-top: 0;
  z-index: 25;
`;

export const Dish = styled.h2`
  font-size: 20px;
  font-family: ${FONTS.bold};
  color: ${PALETTE.white};
  margin: 0;
  margin-bottom: 68px;
  width: 100%;
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
`;
