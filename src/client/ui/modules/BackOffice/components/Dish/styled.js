import styled from 'styled-components';
import { FONTS, PALETTE, THEME } from 'client/style/constants';
import { Form, Select } from 'antd';
import { InputForm } from 'client/ui/components/_ui/Input';
import { Uploader } from 'client/ui/components/_ui/Uploader';
import { Button } from 'client/ui/components/_ui/Button';

const FormItem = Form.Item;
const { Option } = Select;

export const DishWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  border-radius: ${THEME.borderRadiusL};
  background-color: ${PALETTE.white};
  box-shadow: ${THEME.boxShadow1};
  padding: 22px 20px 30px 22px;
`;

export const FormStyled = styled(Form)`
  width: 100%;
`;


export const FormCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Form2Col = styled.div`
  display: flex;
  flex-direction: row;

  > div {
    &:first-child {
      width: 338px;
      margin-right: 20px;
    }

    &:last-child {
      width: 739px;
    }
  }
`;

export const Form3Col = styled.div`
  display: flex;
  flex-direction: row;

  > div {
    width: 168px;

    &:first-child {
      width: 358px;
    }

    &:not(:last-child) {
      margin-right: 22px;
    }
  }
`;


export const UploaderImage = styled(Uploader)`
  .ant-upload-picture-card-wrapper {
    .ant-upload-select {
      width: 338px;
      height: 216px;
    }
  }

  .list-images {
    > div {
      width: auto;

      img {
        width: 338px;
        height: 216px;
      }
    }
  }
`;

export const FormItemSubmit = styled(FormItem)`
  width: 88px;
  margin-bottom: 0;
  position: absolute;
  top: 10px;
  right: 22px;
  z-index: 20;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
`;

export const Control = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 32px;
  height: 32px;
  background-color: ${PALETTE.grey26};
  border-radius: ${THEME.borderRadiusS};

  &:not(:last-child) {
    margin-right: 18px;
  }

  > svg {
    width: 18px;
    height: 18px;

    path {
      fill: ${PALETTE.black1};
    }
  }
`;

export const FormItemStyled = styled(FormItem)`
  margin-bottom: 0;

  &:not(:last-child) {
    margin-bottom: 22px;
  }

  &.ant-form-item-has-success {
    .ant-form-item-children-icon {
      position: absolute;
      top: 34px;
      right: 15px;
      z-index: 1;
      width: 17px;
      height: 14px;
      font-size: 15px;
    }

    .ant-form-item-explain-success {
      display: none;
    }
  }

  &.ant-form-item-has-error {
    .ant-input {
      border-color: ${PALETTE.red2};

      &:focus {
        outline: none;
        box-shadow: unset;
      }
    }

    .ant-form-item-children-icon {
      position: absolute;
      top: 34px;
      right: 15px;
      z-index: 1;
      width: 17px;
      height: 14px;
      font-size: 15px;
    }

    .ant-form-item-explain-error {
      position: absolute;
      bottom: -23px;
      right: 0;
      font-size: 13px;
      font-family: ${FONTS.medium};
    }
  }

  .ant-form-item-label {
    padding: 0 0 12px;

    label {
      font-size: 16px;
      font-family: ${FONTS.bold};
      color: ${PALETTE.grey12};
      text-transform: uppercase;

      &.ant-form-item-required {
        &::before {
          display: none !important;
        }

        &::after {
          display: block;
          margin-left: 4px;
          color: ${PALETTE.red2};
          font-size: 16px;
          font-family: ${FONTS.bold};
          line-height: 1;
          content: '*';
        }
      }
    }
  }
`;

export const InputStyled = styled(InputForm)`
  height: 62px;
  font-size: 18px;
  font-family: ${FONTS.medium};
  border-radius: ${THEME.borderRadiusL};
`;

export const Hr = styled.hr`
  margin: 8px 0 30px;
  border: 1px solid ${PALETTE.grey23};
`;



export const SelectStyled = styled(Select)`
  &.ant-select {
    .ant-select-selector {
      min-height: 62px !important;
      background-color: ${PALETTE.white};
      border: 1px solid ${PALETTE.grey6};
      border-radius: ${THEME.borderRadiusL};
      padding: 4px 18px;
      display: flex;
      align-items: center;

      .ant-select-selection-item {
        height: 48px;
        font-size: 18px;
        font-family: ${FONTS.medium};
        display: flex;
        align-items: center;

        .ant-select-selection-item-content {
          height: 48px;
          display: flex;
          align-items: center;
        }

        .ant-select-selection-item-remove {
          font-size: 17px;
          font-family: ${FONTS.medium};

          > svg {
            stroke-width: 20px;
          }
        }
      }

      .ant-select-selection-search {
        font-family: ${FONTS.regular};
        font-size: 16px;
      }

      .ant-select-selection-overflow-item {
        margin-left: -10px;
      }

      .ant-select-selection-placeholder {
        font-size: 18px;
        font-family: ${FONTS.medium};
        display: flex;
        align-items: center;
      }
    }

    .ant-select-arrow {
      top: 48%;
      font-size: 20px;
      right: 28px !important;
      color: ${PALETTE.black};
    }

    &:hover {
      .ant-select-selector {
        border-color: ${PALETTE.grey6} !important;
        box-shadow: unset !important;
      }
    }

    &.ant-select-focused {
      .ant-select-selector {
        outline: none !important;
        border-color: ${PALETTE.grey6} !important;
        box-shadow: unset !important;
      }
    }

    &.ant-select-single {
      .ant-select-selection-search {
        > input {
          height: 100%;
        }
      }
    }

    &.ant-select-multiple {
      .ant-select-selection-item {
        height: 48px;
        font-size: 18px;
        font-family: ${FONTS.medium};
        display: flex;
        align-items: center;
        border-radius: ${THEME.borderRadiusL};
        background-color: ${PALETTE.grey16};
        margin-right: 16px;
        color: ${PALETTE.black};

        .ant-select-selection-item-content {
          height: 48px;
          display: flex;
          align-items: center;
          padding: 4px 8px;
        }

        .ant-select-selection-item-remove {
          font-size: 17px;
          font-family: ${FONTS.medium};

          .anticon-close {
            margin-right: 4px;
          }
        }
      }

      .ant-select-selection-placeholder {
        left: 20px;
      }
    }
  }
`;

export const OptionStyled = styled(Option)`
  height: 62px;
  font-size: 18px;
  font-family: ${FONTS.medium};
  border-radius: ${THEME.borderRadiusL};
`;
