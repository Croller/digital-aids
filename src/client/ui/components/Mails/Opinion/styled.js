import styled from 'styled-email-components';
import { FONTS, THEME, PALETTE } from 'client/style/constants';

export const Wrapper = styled.div`
  display: block;
  padding: 27px 30px;
  width: 600px;

  table {
    padding: 0;

    tr {
      padding: 0;

      td {
        padding: 0;
      }
    }
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const LogoWrapper = styled.div`
  width: 185px;
  position: relative;
  cursor: pointer;
`;

export const LogoImg = styled.img`
  height: 32px;
`;

export const LogoText = styled.span`
  position: absolute;
  bottom: -2px;
  right: 90px;
  font-family: ${FONTS.semiBold};
  font-size: 12px;
  color: ${PALETTE.green1};
  z-index: 3;
  width: 100%;
  text-align: right;
`;

export const Title = styled.h3`
  font-family: ${FONTS.bold};
  font-size: 14px;
  color: ${PALETTE.green1};
  margin: 0;
`;

export const Valuation = styled.div`
  width: 264px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 45%;
  font-family: ${FONTS.regular};
  box-shadow: ${THEME.boxShadow2};
  border-radius: ${THEME.borderRadiusM};
  background-color: ${p => (p.active ? `${PALETTE.grey16}` : `${PALETTE.white}`)};
  color: ${PALETTE.black};
  margin-bottom: 12px;
`;

export const TitleRate = styled.h3`
  font-family: ${FONTS.semiBold};
  font-size: 14px;
  margin: 0;
  margin-top: 21px;
  margin-bottom: 14px;
  text-transform: uppercase;
`;

export const TitleEmoji = styled.p`
  font-family: ${FONTS.semiBold};
  font-size: 52px;
  margin: 0;
  padding: 0;
  margin-bottom: 4px;
  top: -12px;
  height: 58px;
  position: relative;
`;

export const TitleDec = styled.p`
  font-family: ${FONTS.regular};
  font-size: 16px;
  margin: 0;
  padding: 0;
  top: -12px;
  position: relative;
`;

export const EmojiWrapper = styled.h4`
  margin: 0;
  margin-bottom: -6px;
  margin-top: -10px;
  font-size: 40px;
`;

export const Comments = styled.h3`
  font-family: ${FONTS.semiBold};
  font-size: 14px;
  margin: 0;
  margin-bottom: 23px;
  text-transform: uppercase;
`;

export const CommnetsBlock = styled.p`
  width: 100%;
  padding: 22px 31px 22px 20px;
  background-color: ${PALETTE.grey25};
  font-family: ${FONTS.semiBold};
  font-size: 14px;
  margin-bottom: 55px;
`;

export const Footer = styled.span`
  width: 100%;
  font-family: ${FONTS.bold};
  font-size: 20px;
  margin-bottom: 51px;
  text-align: center;
`;
