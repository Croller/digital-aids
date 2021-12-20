import { PALETTE } from 'client/style/base';
import styled from 'styled-components';
import { EditText } from '../EditText';

export const HeaderWrapper = styled.div`
  width: 768px;

  &:hover {
    > div {
      border: 2px dashed ${PALETTE.grey1};
    }
  }
`;

export const EditTextStyled = styled(EditText)`
  width: 100%;
  text-align: center;
  font-size: 24px;
  border: 2px solid transparent;

  
`;
