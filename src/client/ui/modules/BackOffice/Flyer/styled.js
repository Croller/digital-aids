import styled from 'styled-components';
import { PALETTE, FONTS, THEME } from 'client/style/constants';
import { Button } from 'client/ui/components/_ui/Button';
import { NavBar } from 'client/ui/modules/BackOffice/components/NavBar';
import { Loader } from 'client/ui/components/_block/Loader';
import { InputDefault } from 'client/ui/components/_ui/Input';
import { Radio } from 'antd';

export const FlyerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const NavBarStyled = styled(NavBar)`
  margin-bottom: 10px;
  width: 100%;
`;

export const RadioStyled = styled(Radio.Group)`
  display: block;
  margin-bottom: 40px;

  .ant-radio-button-wrapper {
    font-size: 16px;
    font-family: ${FONTS.medium};
    color: ${PALETTE.black};
    border: 1px solid ${PALETTE.black};
    text-transform: uppercase;

    &.ant-radio-button-wrapper-checked {
      color: ${PALETTE.white};
      border-color: ${PALETTE.green1};
      background-color: ${PALETTE.green1};
    }

    &::before {
      background-color: unset;
    }

    &:first-child {
      border-top-left-radius: ${THEME.borderRadiusM};
      border-bottom-left-radius: ${THEME.borderRadiusM};
    }

    &:last-child {
      border-top-right-radius: ${THEME.borderRadiusM};
      border-bottom-right-radius: ${THEME.borderRadiusM};
    }
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 100%;
`;

export const LoaderStyled = styled(Loader)`
  height: 100%;
`;

export const QRCodeWrapper = styled.div`
  position: relative;
  width: 298px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: ${THEME.boxShadow2};
  outline: 1px solid ${PALETTE.black};
  outline-offset: -10px;
  margin-right: 156px;
  padding: 0 26px;
`;

export const TitleQR = styled.h4`
  font-size: 32px;
  font-family: ${FONTS.regularMontaga};
  color: ${PALETTE.black};
  margin: 44px 0 24px;
`;

export const TextCovid = styled.p`
  font-size: 10px;
  font-family: ${FONTS.medium};
  color: ${PALETTE.black};
  padding: 0;
  margin: 0;
  margin-bottom: 24px;
`;

export const LngAvaible = styled.p`
  font-size: 9px;
  font-family: ${FONTS.medium};
  color: ${PALETTE.black};
  text-transform: uppercase;
  padding: 0;
  margin: 0;
  margin: 24px 0 10px;
`;

export const LngList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 36px;
`;

export const LngItem = styled.li`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid ${PALETTE.grey4};
  background-color: ${PALETTE.white};
  color: ${PALETTE.grey4};
  font-family: ${FONTS.regular};
  font-size: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  margin-bottom: 14px;

  &:not(:last-child) {
    margin-right: 14px;
  }
`;

export const LoadDocWrapper = styled.div`
  width: 290px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TitleDoc = styled.h4`
  font-size: 16px;
  font-family: ${FONTS.medium};
  color: ${PALETTE.black};
  margin-bottom: 34px;
  text-align: center;
`;

export const ButtonStyled = styled(Button)`
  width: 100%;
  height: 52px;
  background-color: ${PALETTE.green1};
  font-family: ${FONTS.semiBold};
  font-size: 16px;
  color: ${PALETTE.white};
  text-transform: uppercase;
  margin-bottom: 22px;
`;

export const TitleTableQR = styled.h4`
  font-size: 32px;
  font-family: ${FONTS.regularMontaga};
  color: ${PALETTE.black};
  margin: 0;
  margin-top: 44px;
`;

export const InputStyled = styled(InputDefault)`
  width: 92px;
  height: 52px;
  font-size: 18px;
  font-family: ${FONTS.medium};
  border-radius: ${THEME.borderRadiusL};
  margin-bottom: 22px;
  text-align: center;
`;

export const BlockNumber = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: ${FONTS.regular};
  font-size: 20px;
  color: ${PALETTE.black};
  background-color: ${PALETTE.white};
  margin-bottom: 12px;
`;

