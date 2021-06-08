import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button';
import { THEME, PALETTE } from 'client/style/constants';

export const Wrapper = styled.div`
  display: block;
  padding: 22px 27px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ButtonStyled = styled(Button)`
  height: 60px;
  box-shadow: ${THEME.boxShadow1};
  border-radius: ${THEME.borderRadiusM};
  background-color: ${PALETTE.white};

  > svg {
    width: 24px;
    height: 24px;
    margin-right: 13px;

    path {
      fill: ${PALETTE.grey13};
    }
  }

  &:not(:last-child) {
    margin-bottom: 12px;
  }

  &:last-child {
    background-color: ${PALETTE.green1};
    color: ${PALETTE.white};
    text-transform: uppercase;
  }

  &:nth-child(4) {
    background-color: ${PALETTE.grey2};
  }
`;

