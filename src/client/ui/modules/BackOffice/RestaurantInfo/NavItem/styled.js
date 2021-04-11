import styled from 'styled-components';
import { FONTS, PALETTE } from 'client/style/constants';
import { Button } from 'client/ui/components/_ui/Button';

export const NavItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Item = styled(Button)`
  height: 50px;
  padding: 0;
  min-width: 180px;
  font-family: ${FONTS.medium};
  background-color: ${PALETTE.green1};

  &:not(:last-child) {
    margin-right: 8px;
  }

  > span {
    > span > svg {
      width: 22px;
      height: 22px;
      margin-right: 10px;

      path {
        fill: ${PALETTE.white};
      }
    }

    > span {
      font-size: 16px;
      color: ${PALETTE.white};
      text-transform: uppercase;
    }
  }
`;
