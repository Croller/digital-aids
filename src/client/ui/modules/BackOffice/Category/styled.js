import styled, { css } from 'styled-components';
import { FONTS, PALETTE, THEME } from 'client/style/constants';
import { NavBar } from 'client/ui/modules/BackOffice/components/NavBar';
import { RestaurantInfo } from 'client/ui/modules/BackOffice/components/RestaurantInfo';
import { Button } from 'client/ui/components/_ui/Button';
import { Loader } from 'client/ui/components/_block/Loader';
import { EmptyBlock } from 'client/ui/modules/BackOffice/components/EmptyBlock';
import { DishForm } from './DishForm';
import { Info } from './Info';

const listStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const buttonStyle = css`
  height: 58px;
  margin-right: 26px;
  margin-bottom: 22px;
  background-color: ${p => (p.active ? `${PALETTE.black1}` : `${PALETTE.grey26}`)};
  border-radius: ${THEME.borderRadiusL};
  color: ${p => (p.active ? `${PALETTE.white}` : `${PALETTE.black1}`)};
  font-family: ${FONTS.semiBold};
  font-size: 18px;
  text-transform: uppercase;

  > svg {
    width: 22px;
    height: 22px;
    margin-right: 10px;

    path {
      fill: ${p => (p.active ? `${PALETTE.white}` : `${PALETTE.black1}`)};
    }
  }
`;

export const CategoryEditWrapper = styled.div`
  width: 100%;
`;

export const LoaderStyled = styled(Loader)`
  height: 100%;
`;

export const NavBarStyled = styled(NavBar)`
  margin-bottom: 28px;
`;

export const RestaurantInfoStyled = styled(RestaurantInfo)`
  margin-bottom: 30px;
`;

export const ListLng = styled.div`
  ${listStyle}

  flex-wrap: wrap;
  margin-bottom: 10px;
`;

export const Lng = styled(Button)`
  ${buttonStyle}

  width: auto;
  padding: 0 12px;
  margin-right: 22px;
  margin-bottom: 22px;

  &:first-child {
    width: 163px;
  }
`;

export const InfoStyled = styled(Info)`
  margin-bottom: 22px;
`;

export const DishControls = styled.div`
  ${listStyle}

  padding-top: 18px;
  border-top: 1px solid ${PALETTE.green1};
  margin: 12px 0 32px;
`;

export const NewDish = styled(Button)`
  width: auto;
  max-width: 240px;
  height: 46px;
  padding: 0 20px;
  background-color: ${PALETTE.green1};
  border-radius: ${THEME.borderRadiusL};
  color: ${PALETTE.white};
  font-family: ${FONTS.semiBold};
  font-size: 16px;
  text-transform: uppercase;

  > svg {
    width: 22px;
    height: 22px;
    margin-left: 22px;

    path {
      fill: ${PALETTE.white};
    }
  }
`;

export const ArchiveBtn = styled(Button)`
  width: 175px;
  height: 46px;
  margin-left: auto;
  background-color: ${PALETTE.grey26};
  border-radius: ${THEME.borderRadiusL};
  color: ${PALETTE.black1};
  font-family: ${FONTS.medium};
  font-size: 14px;
  text-transform: uppercase;

  > svg {
    width: 19px;
    height: 19px;
    margin-right: 22px;

    path {
      fill: ${PALETTE.black1};
    }
  }
`;

export const DishList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 48px;
`;

export const DishFormStyled = styled(DishForm)`
  &:not(:last-child) {
    margin-bottom: 22px;
  }
`;

export const EmptyBlockStyled = styled(EmptyBlock)`
  height: 300px;
  min-height: 0;
`;

