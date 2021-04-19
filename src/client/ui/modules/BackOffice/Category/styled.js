import styled, { css } from 'styled-components';
import { NavBar } from 'client/ui/modules/BackOffice/components/NavBar';
import { RestaurantInfo } from 'client/ui/modules/BackOffice/components/RestaurantInfo';
import { Button } from 'client/ui/components/_ui/Button';
import { FONTS, PALETTE, THEME } from 'client/style/constants';

const listStyle = css`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
`;

const buttonStyle = css`
  height: 58px;
  min-width: 210px;
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

export const CategoryEdit = styled.div`
  width: 100%;
`;

export const NavBarStyled = styled(NavBar)`
  margin-bottom: 28px;
`;

export const RestaurantInfoStyled = styled(RestaurantInfo)`
  margin-bottom: 40px;
`;

export const ListMenu = styled.div`
    ${listStyle}
`;

export const MenuControl = styled.div`
  ${listStyle}

  flex-wrap: nowrap;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export const ListControls = styled.div`
  ${listStyle}

  margin-left: auto;
`;

export const MenuBtn = styled(Button)`
  ${buttonStyle}

  width: 210px;
`;

export const CreateDaily = styled(Button)`
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

  margin-bottom: 18px;
`;

export const Lng = styled(Button)`
  ${buttonStyle}

  min-width: 133px;
  margin-right: 22px;
  margin-bottom: 22px;
`;

export const ListCategory = styled.div`
${listStyle}

margin-bottom: 16px;
`;

export const Caterory = styled(Button)`
  height: 38px;
  min-width: 48px;
  background-color: transparent;
  color: ${p => (p.active ? `${PALETTE.black1}` : `${PALETTE.grey12}`)};
  border-radius: unset;
  border-bottom: ${p => (p.active && `4px solid ${PALETTE.black1}`)};
  text-transform: uppercase;
  font-family: ${FONTS.semiBold};
  font-size: 16px;
  margin-right: 22px;
  margin-bottom: 14px;
  align-items: flex-start;
`;

export const NewCaterory = styled(Button)`
  height: 38px;
  min-width: 48px;
  background-color: transparent;
  color: ${PALETTE.green1};
  text-transform: uppercase;
  font-family: ${FONTS.semiBold};
  font-size: 16px;
  align-items: flex-start;

  > svg {
    width: 22px;
    height: 22px;
    margin-left: 10px;

    path {
      fill: ${PALETTE.green1};
    }
  }
`;

export const DishControls = styled.div`
  ${listStyle}
`;

export const AddDish = styled(Button)`
  height: 58px;
  width: 194px;
  color: ${PALETTE.white};
  background-color: ${PALETTE.green1};
  text-transform: uppercase;
  font-family: ${FONTS.semiBold};
  font-size: 18px;
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
  height: 58px;
  min-width: 171px;
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
    margin-right: 7px;

    path {
      fill: ${PALETTE.black1};
    }
  }
`;

// min-width: 136px;
//   background-color: ${PALETTE.grey26};
//   font-size: 14px;
//   font-family: ${FONTS.medium};

//   > svg {
//     width: 19px;
//     height: 19px;
//     margin-right: 7px;

//     path {
//       fill: ${PALETTE.black1};
//     }
//   }
