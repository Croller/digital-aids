import styled from 'styled-components';
import {
  FONTS,
  PALETTE,
  THEME,
  BREAKPOINTS,
} from 'client/style/constants';

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Content = styled.div`
  margin: 0 auto;
  height: calc(100vh - 104px);
  width: 100%;
  max-width: 1440px;
`;
