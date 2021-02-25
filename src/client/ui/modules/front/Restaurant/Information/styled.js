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
  top: 20px;
  right: 26px;
  width: 20px;
  height: 20px;
  background-color: transparent;
  z-index: 25;

  > svg {
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
`;

export const Content = styled.div`
  position: relative;
  padding: 0 27px;
  margin-top: -88px;
  z-index: 25;
`;

export const Restaurant = styled.h2`
  font-size: 20px;
  font-family: ${FONTS.bold};
  color: ${PALETTE.white};
  margin: 0;
  margin-bottom: 32px;
`;

export const InfoWrapper = styled.div`
  position: relative;
  padding: 16px 14px 14px;
  box-shadow: ${THEME.boxShadow2};
  margin-bottom: 15px;
  border-radius: ${THEME.borderRadius};
  background-color: ${PALETTE.white};
`;

export const LinkButton = styled(Button)`
  position: absolute;
  top: 2px;
  right: 6px;
  width: 36px;
  height: 36px;
  background-color: transparent;

  > svg {
    path {
      fill: ${PALETTE.grey8};
    }
  }
`;

export const IconTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;

  > svg {
    height: 18px;
    width: 18px;
    margin-right: 6px;

    path {
      fill: ${PALETTE.green1};
    }
  }
`;

export const IconText = styled.span`
  color: ${PALETTE.grey5};
  font-family: ${FONTS.bold};
  font-size: 16px;
`;

export const Price = styled.span`
  margin-left: 5px;
  color: ${PALETTE.green1};
`;

export const InfoControls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const CallButton = styled(Button)`
  height: 30px;
  flex: 45%;
  font-size: 14px;
  margin-right: 22px;

  > svg {
    width: 18px;
    height: 18px;
    margin-right: 5px;

    path {
      fill: ${PALETTE.black};
    }
  }
`;

export const MenuButton = styled(Button)`
  flex: 45%;
  height: 30px;
  background-color: ${PALETTE.green1};
  color: ${PALETTE.white};
  font-size: 14px;
`;

export const ReservButton = styled(Button)`
  text-transform: uppercase;
  box-shadow: ${THEME.boxShadow1};
  height: 48px;
  font-size: 16px;
  margin-bottom: 15px;
`;

export const AddessWrapper = styled.div`
  padding: 20px 0;
  box-shadow: ${THEME.boxShadow2};
  margin-bottom: 18px;
  border-radius: ${THEME.borderRadius};
  background-color: ${PALETTE.white};
`;

export const RestaurantName = styled.h3`
  margin: 0 18px;
  font-size: 16px;
  font-family: ${FONTS.bold};
`;

export const Hr = styled.hr`
  margin: 14px 0;
  border: 0.4px solid ${PALETTE.grey7};
`;

export const AddressContainer = styled.div`
  padding: 0 16px;
`;

export const AddressTitle = styled.div`
  margin-top: 14px;
  margin-bottom: 18px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  > svg {
    height: 20px;
    width: 20px;
    margin-right: 8px;

    path {
      fill: ${PALETTE.green1};
    }
  }
`;

export const Address = styled.span`
  color: ${PALETTE.grey5};
  font-family: ${FONTS.bold};
  font-size: 16px;

  > svg {
    path {
      fill: ${PALETTE.green1};
    }
  }
`;

export const MapStyled = styled.div`
  width: 100%;
  height: 140px;
  background-color: ${PALETTE.grey8};
`;

export const RateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 48px;
`;

export const RateBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 27px 16px 35px;
  flex: 45%;
  box-shadow: ${THEME.boxShadow2};
  border-radius: ${THEME.borderRadius};

  &:not(:last-child) {
    margin-right: 22px;
  }
`;

export const Rate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;

  > svg {
    margin-right: 6px;
  }
`;

export const RateCurrent = styled.span`
  color: ${PALETTE.grey9};
  font-family: ${FONTS.bold};
  font-size: 16px;
`;

export const RateMax = styled.span`
  color: ${PALETTE.grey9};
  font-family: ${FONTS.bold};
  font-size: 10px;
`;

export const RateComment = styled.p`
  margin: 0;
  margin-bottom: 10px;
  color: ${PALETTE.grey3};
  font-family: ${FONTS.bold};
  font-size: 12px;
  text-align: center;
  text-transform: lowercase;
`;

export const ReviewsButton = styled(Button)`
  height: 30px;
  background-color: ${PALETTE.green1};
  color: ${PALETTE.white};
  font-size: 12px;
`;
