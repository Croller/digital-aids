import styled, { css } from 'styled-components';
import { PALETTE } from 'client/style/base';
import { EditText } from '../EditText';

const editText = css`
  text-align: center;
  font-size: 16px;
  border: 2px solid transparent;
  
  &input {
    border: 2px solid transparent;
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 0 48px;
  background-color: ${PALETTE.grey2};

  &:hover {
    > div {
      border: 2px dashed ${PALETTE.grey1};
    }

    > img {
      border: 2px dashed ${PALETTE.grey1};
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ImageStyled = styled.img`
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
