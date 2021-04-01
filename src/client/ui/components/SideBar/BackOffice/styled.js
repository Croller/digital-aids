import styled from 'styled-components';
import {
  PALETTE,
  THEME,
  FONTS,
  Z_INDEX,
} from 'client/style/constants';

export const Wrapper = styled.div`
  width: 245px;
  height: calc(100% - 97px);
  position: fixed;
  top: 97px;
  left: 0;
  background-color: ${PALETTE.grey20};
  box-shadow: ${THEME.boxShadowHeader};
`;  
