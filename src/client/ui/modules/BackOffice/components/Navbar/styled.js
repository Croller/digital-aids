import { PALETTE } from 'client/style/constants';
import { Button } from 'client/ui/components/_ui/Button';
import styled from 'styled-components';

export const BackButton = styled(Button)`
  background-color: transparent;

  > span > svg {
    margin-right: 4px;

    path {
      fill: ${PALETTE.green1};
    }
  }
`;
