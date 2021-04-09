import styled from 'styled-components';
import { Topbar } from 'client/ui/components/Navbar/BackOffice/Topbar';
import { Loader } from 'client/ui/components/_block/Loader';

export const Wrapper = styled.div`
  width: 100%;
`;

export const TopbarStyled = styled(Topbar)`
  margin-bottom: 41px;
`;

export const List = styled.div`
  width: 100%;
  position: relative;
`;

export const LoaderStyled = styled(Loader)`
  min-height: calc(100vh - 330px);
`;
