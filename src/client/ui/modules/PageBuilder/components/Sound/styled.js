import styled, { css } from 'styled-components';
import ReactAudioPlayer from 'react-audio-player';
import { PALETTE } from 'client/style/base';
import { EditText } from '../EditText';

const editText = css`
  width: 100%;
  text-align: center;
  font-size: 16px;
  border: 2px solid transparent;
  
  &input {
    border: 2px solid transparent;
  }
`;

export const SoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 0 68px;
  background-color: ${PALETTE.white};

  &:hover {
    > div {
      border: 2px dashed ${PALETTE.grey1};
    }

    > img {
      border: 2px dashed ${PALETTE.grey1};
    }
  }
`;

export const SoundStyled = styled(ReactAudioPlayer)`
  border: 2px solid transparent;
`;

export const EditSrcStyled = styled(EditText)`
  ${editText}
`;

export const EditTextStyled = styled(EditText)`
  ${editText}
  
  width: 304px !important;
  margin-top: 18px !important;
`;
