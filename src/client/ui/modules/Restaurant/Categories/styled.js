import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button';
import { FONTS, THEME, PALETTE } from 'client/style/constants';

export const Wrapper = styled.div`
  padding: 22px 27px;
`;

export const Title = styled.h3`
  font-family: ${FONTS.bold};
  font-size: 16px;
  text-transform: uppercase;
  text-align: center;
  margin: 0;
  margin-bottom: 12px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ButtonStyled = styled(Button)`
  height: 60px;
  font-family: ${FONTS.medium};
  box-shadow: ${THEME.boxShadow1};
  border-radius: ${THEME.borderRadiusM};
  background-color: ${PALETTE.white};
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;
