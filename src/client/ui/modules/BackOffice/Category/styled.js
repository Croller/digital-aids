import styled, { css } from 'styled-components';
import { NavBar } from 'client/ui/modules/BackOffice/components/NavBar';
import { RestaurantInfo } from 'client/ui/modules/BackOffice/components/RestaurantInfo';
import { Button } from 'client/ui/components/_ui/Button';
import { FONTS, PALETTE, THEME } from 'client/style/constants';
import { Loader } from 'client/ui/components/_block/Loader';
import { EmptyBlock } from 'client/ui/modules/BackOffice/components/EmptyBlock';
import { CategoryForm } from './CategoryForm';
import { DishForm } from './DishForm';
import { Info } from './Info';

const listStyle = css`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
`;

const buttonStyle = css`
  height: 58px;
  background-color: ${p => (p.active ? `${PALETTE.black1}` : `${PALETTE.grey26}`)};
  color: ${p => (p.active ? `${PALETTE.white}` : `${PALETTE.black1}`)};
  text-transform: uppercase;
  font-family: ${FONTS.semiBold};
  font-size: 18px;
  margin-right: 26px;
  margin-bottom: 22px;
  border-radius: ${THEME.borderRadiusL};

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
  margin-bottom: 40px;
`;

export const MenuControl = styled.div`
  ${listStyle}

  flex-wrap: nowrap;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const ListControls = styled.div`
  ${listStyle}

  margin-left: unset;
`;

export const Control = styled(Button)`
  height: 58px;
  width: 290px;
  color: ${PALETTE.white};
  background-color: ${PALETTE.green1};
  text-transform: uppercase;
  font-family: ${FONTS.semiBold};
  font-size: 16px;

  > svg {
    width: 22px;
    height: 22px;
    margin-left: 22px;

    path {
      fill: ${PALETTE.white};
    }
  }
`;

export const ListLng = styled.div`
  ${listStyle}

  flex-wrap: wrap;
  margin-bottom: 18px;
`;

export const Lng = styled(Button)`
  ${buttonStyle}

  width: auto;
  margin-right: 22px;
  margin-bottom: 22px;
  padding: 0 12px;

  &:first-child {
    width: 163px;
  }
`;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 16px;
`;

export const CategoryEdit = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  background-color: ${PALETTE.grey26};
  border-radius: ${THEME.borderRadiusM};
  margin-top: -4px;

  > svg {
    width: 20px;
    height: 20px;

    path {
      fill: ${PALETTE.black1};
    }
  }
`;

export const ListCategory = styled.div`
  ${listStyle}

  width: 100%;
  flex-wrap: wrap;
`;

export const Caterory = styled(Button)`
  height: 38px;
  width: auto;
  background-color: transparent;
  color: ${p => (p.active ? `${PALETTE.black1}` : `${PALETTE.grey12}`)};
  border-radius: unset;
  border-bottom: ${p => (p.active && `4px solid ${PALETTE.black1}`)};
  text-transform: uppercase;
  font-family: ${FONTS.semiBold};
  font-size: 16px;
  margin-right: 22px;
  margin-bottom: 14px;
  padding: 0 12px;
  align-items: flex-start;
  word-wrap: normal;

  ${p => p.new && css`
    color: ${PALETTE.green1};

    > svg {
      width: 22px;
      height: 22px;
      margin-left: 10px;

      path {
        fill: ${PALETTE.green1};
      }
    }
  `}
`;

export const CateroryFormStyled = styled(CategoryForm)`
  margin-bottom: 30px;
`;

export const InfoStyled = styled(Info)`
  margin-bottom: 22px;
`;

export const DishControls = styled.div`
  ${listStyle}

  margin-bottom: 32px;
`;

export const NewDish = styled(Button)`
  height: 46px;
  width: 184px;
  color: ${PALETTE.white};
  background-color: ${PALETTE.green1};
  text-transform: uppercase;
  font-family: ${FONTS.semiBold};
  font-size: 16px;
  border-radius: ${THEME.borderRadiusL};

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
  height: 46px;
  width: 175px;
  font-size: 14px;
  font-family: ${FONTS.medium};
  color: ${PALETTE.black1};
  text-transform: uppercase;
  background-color: ${PALETTE.grey26};
  margin-left: auto;
  border-radius: ${THEME.borderRadiusL};

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
  justify-content: flex-start;
  flex-direction: column;
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

