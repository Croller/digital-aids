import styled from 'styled-components';
import { NavBar } from 'client/ui/modules/BackOffice/components/NavBar';
import { Loader } from 'client/ui/components/_block/Loader';

export const OrderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const NavBarStyled = styled(NavBar)`
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
