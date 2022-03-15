import styled from 'styled-components';
import { FONTS, PALETTE, THEME } from 'client/style/constants';
import { Button } from 'client/ui/components/_ui/Button';

export const NavItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Item = styled(Button)`
  height: 50px;
  padding: 0;
  min-width: 210px;
  font-family: ${FONTS.medium};
  background-color: ${PALETTE.green1};
  border-radius: ${THEME.borderRadiusL};

  &:not(:last-child) {
    margin-right: 8px;
  }

  > span {
    font-size: 16px;
    font-family: ${FONTS.medium};
    color: ${PALETTE.white};
    text-transform: uppercase;

    > span > svg {
      width: 22px;
      height: 22px;
      margin-right: 10px;

      path {
        fill: ${PALETTE.white};
      }
    }
  }
`;
