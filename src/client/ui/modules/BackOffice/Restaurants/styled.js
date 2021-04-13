import styled from 'styled-components';
import { Navbar } from 'client/ui/modules/BackOffice/components/Navbar';
import { Loader } from 'client/ui/components/_block/Loader';

export const RestaurantList = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const NavbarStyled = styled(Navbar)`
  margin-bottom: 40px;
`;

export const List = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const LoaderStyled = styled(Loader)`
  height: 100%;
`;
