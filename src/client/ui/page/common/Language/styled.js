import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button/Btn';
import { THEME } from 'client/style/constants';

export const Wrapper = styled.div`
  display: block;
  padding: 0 27px 80px 27px;
`;

export const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: ${THEME.boxShadow1};
  border-bottom-left-radius: ${THEME.borderRadius};
  border-bottom-right-radius: ${THEME.borderRadius};
  padding: 60px 0;
`;

export const ButtonStyled = styled(Button)`
  height: 60px;
  font-size: 22px;
  background-color: transparent;

  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;
