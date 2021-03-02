import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button/Btn';
import { PALETTE, THEME, FONTS } from 'client/style/constants';

export const Wrapper = styled.div`
  display: block;
  background-color: ${PALETTE.white};
`;

export const ImgWrapper = styled.div`
  position: relative;
`;

export const Img = styled.img`
  width: 100%;
  height: 144px;
  object-fit: cover;
`;

export const Number = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 32px;
  width: 54px;
  border-top-right-radius: ${THEME.borderRadiusControl};
  background-color: ${PALETTE.white};
  font-family: ${FONTS.bold};
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  padding: 20px 12px;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-family: ${FONTS.medium};
  width: 80%;
  margin: 0;
  margin-bottom: 14px;
`;

export const Description = styled.p`
  font-size: 16px;
  font-family: ${FONTS.regular};
  margin: 0;
  margin-bottom: 22px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AllergensButton = styled(Button)`
  width: 108px;
  height: 28px;
  font-size: 12px;
  text-transform: uppercase;
  font-family: ${FONTS.bold};
`;

export const Weight = styled.span`
  font-size: 16px;
  font-family: ${FONTS.bold};
`;
