import styled from 'styled-components';
import { PALETTE } from 'client/style/base';
import { EditTextArea } from '../EditTextArea';

export const ParagraphWrapper = styled.div`
  width: 768px;

  &:hover {
    > div {
      border: 2px dashed ${PALETTE.grey1};
    }
  }
`;

export const EditTextAreaStyled = styled(EditTextArea)`
  width: 100%;
  font-size: 14px;
  border: 2px solid transparent;

  &textarea {
    border: 2px solid transparent;
  }
`;
