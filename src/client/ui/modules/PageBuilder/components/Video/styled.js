import styled, { css } from 'styled-components';
import ReactPlayer from 'react-player';
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

export const VideoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 68px 0 48px;
  background-color: ${PALETTE.grey3};

  &:hover {
    > div {
      > div {
        border: 2px dashed ${PALETTE.grey1};
      }

      > img {
        border: 2px dashed ${PALETTE.grey1};
      }
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const VideoStyled = styled(ReactPlayer)`
  width: 1024;
  height: 610px;
  text-align: center;
  border: 2px solid transparent;
`;

export const EditSrcStyled = styled(EditText)`
  ${editText}
`;

export const EditTextStyled = styled(EditText)`
  ${editText}
  
  width: 364px !important;
  margin-top: 18px !important;
`;
