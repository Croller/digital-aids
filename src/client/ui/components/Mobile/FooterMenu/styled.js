import styled from 'styled-components';
import { PALETTE, Z_INDEX } from 'client/style/constants';
import { ScrollHideBlock } from 'client/ui/components/base/ScrollHideBlock';

export const Wrapper = styled.div`
  display: block;
`;

export const ScrollHideBlockStyled = styled(ScrollHideBlock)`
  display: block;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 80px;
  width: 100%;
  z-index: ${Z_INDEX.footerMenu};
  background-color: ${PALETTE.white};
`;

