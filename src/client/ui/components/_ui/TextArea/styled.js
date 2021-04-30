import styled from 'styled-components';
import { PALETTE, THEME, FONTS } from 'client/style/constants';
import { Input } from 'antd';

const { TextArea } = Input;

export const TextAreaF = styled(TextArea)`
  width: 100%;
  border-radius: ${THEME.borderRadiusS};
  border: 1px solid ${PALETTE.grey6};
  font-family: ${FONTS.regular};
  font-size: 16px;
  color: ${PALETTE.black};
  background-color: ${PALETTE.white};
  height: 48px;
  min-height: 48px;
  overflow-y: hidden;
  resize: none;
  padding: 13px 18px !important;
  line-height: 22px;

  &:focus {
    border-color: ${PALETTE.grey6};
    box-shadow: unset;
  }

  &:hover {
    border-color: ${PALETTE.grey6};
  }
`;

export const TextAreaS = styled.textarea`
  width: 100%;
  border-radius: ${THEME.borderRadiusS};
  border: 1px solid ${PALETTE.grey6};
  padding: 18px 22px;
  font-family: ${FONTS.regular};
  font-size: 16px;
  color: ${PALETTE.black};
  background-color: ${PALETTE.white};

  &:focus {
    outline: none;
  }
`;
