import styled from 'styled-components';
import {
  FONTS,
  PALETTE,
  THEME,
} from 'client/style/constants';
import { Button } from 'client/ui/components/_ui/Button';
import { Form, Select } from 'antd';
import { InputForm } from 'client/ui/components/_ui/Input';
import MaskedInput from 'antd-mask-input';

const FormItem = Form.Item;
const { Option } = Select;

export const AccountFormWrapper = styled(Form)`
  width: 100%;
  margin-bottom: 80px;
`;

export const FormCol = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Form2Col = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 22px;

  > div {
    width: 50%;

    &:not(:last-child) {
      margin-right: 26px;
    }
  }
`;

export const FormItemStyled = styled(FormItem)`
  margin-bottom: 0;

  &:not(:last-child) {
    margin-bottom: ${p => p.marginbottom || '22px'};
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
    padding: 0 0 18px;

    label {
      font-size: 16px;
      font-family: ${FONTS.bold};
      color: ${PALETTE.black};
      text-transform: uppercase;

      svg {
        margin-right: 8px;
        width: 22px;
        height: 22px;
      }

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

export const InputMaskStyled = styled(MaskedInput)`
  width: 100%;
  border-radius: ${THEME.borderRadiusL};
  border: 1px solid ${PALETTE.grey6};
  padding: 16px 22px;
  font-family: ${FONTS.medium};
  font-size: 18px;
  color: ${PALETTE.black};
  background-color: ${PALETTE.white};

  &:hover {
    border-color: ${PALETTE.grey3}
  }

  &:focus {
    outline: none;
    border-color: ${PALETTE.grey6};
    box-shadow: unset;
  }
`;

export const SelectStyled = styled(Select)`
  &.select-allergen {
    .ant-select-selection-item {
      height: 35px !important;
      width: 35px;
      padding: 0;
      font-size: 18px;
      border-radius: 30px !important;

      .ant-select-selection-item-remove {
        display: none;
      }

      .ant-select-selection-item-content {
        height: 33px !important;
        margin: 0 !important;
        padding: 0 !important;

        img {
          width: 38px;
          height: 33px;
        }

        > span {
          display: none;
        }
      }
    }
  }

  &.ant-select {
    .ant-select-selector {
      min-height: 48px !important;
      background-color: ${PALETTE.white};
      border: 1px solid ${PALETTE.grey6};
      border-radius: ${THEME.borderRadiusS};
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

      .ant-select-selection-placeholder {
        font-size: 18px;
        font-family: ${FONTS.medium};
        display: flex;
        align-items: center;
      }
    }

    .ant-select-arrow {
      top: 44%;
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
      .ant-select-selector {
        padding: 4px 8px;

        .ant-select-selection-item {
          height: 36px;
          font-size: 18px;
          font-family: ${FONTS.medium};
          display: flex;
          align-items: center;
          border-radius: ${THEME.borderRadiusS};
          background-color: ${PALETTE.grey16};
          margin-right: 8px;
          color: ${PALETTE.black};

          .ant-select-selection-item-content {
            height: 36px;
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
  }
`;

export const OptionStyled = styled(Option)`
  height: 62px;
  font-size: 18px;
  font-family: ${FONTS.medium};
  border-radius: ${THEME.borderRadiusS};
`;

export const Save = styled(Button)`
  min-width: 261px;
  width: 261px;
  height: 62px;
  background-color: ${PALETTE.green1};
  font-family: ${FONTS.semiBold};
  font-size: 18px;
  color: ${PALETTE.white};
  text-transform: uppercase;
  margin: auto;
  margin-bottom: 80px;
  border-radius: ${THEME.borderRadiusL};
`;

