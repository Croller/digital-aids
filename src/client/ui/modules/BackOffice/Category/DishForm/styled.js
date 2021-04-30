import styled, { css } from 'styled-components';
import { FONTS, PALETTE, THEME } from 'client/style/constants';
import { Form, Select } from 'antd';
import { InputForm } from 'client/ui/components/_ui/Input';
import { Uploader } from 'client/ui/components/_ui/Uploader';
import { Button } from 'client/ui/components/_ui/Button';

const FormItem = Form.Item;
const { Option } = Select;

export const DishFormWrapper = styled.div`
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

export const Col = styled.div`
  display: flex;
  flex-direction: column;

  &:first-child {
    /* width: 338px; */
    margin-right: 20px;
  }

  &:last-child {
    width: 100%;
  }
`;

export const FormCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Form2Col = styled.div`
  display: flex;
  flex-direction: row;

  > div {
    width: 50%;

    &:first-child {
      margin-right: 15px
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
  height: 50px;
  font-size: 18px;
  font-family: ${FONTS.medium};
  border-radius: ${THEME.borderRadiusS};

  ${p => p.addonAfter && css`
    padding: 0;

    .ant-input-group {
      height: 48px;
      border: 0;

      .ant-input {
        font-size: 18px;
        font-family: ${FONTS.medium};
        color: ${PALETTE.black};
      }

      .ant-input-group-addon {
        border: 0;
        border-left: 1px solid ${PALETTE.grey3};
        background: transparent;
        font-family: ${FONTS.medium};
        font-size: 18px;
        padding: 4px 18px;
      }
    }

    &.addon-select {
      .ant-input-group {
        .ant-input-group-addon {
          border-left: 0;
          padding: 4px 12px;

          .ant-select {
            .ant-select-selector {
              min-width: 124px;
            }
          }
        }
      }
    }
  `}
`;

export const Hr = styled.hr`
  margin: 8px 0 30px;
  border: 1px solid ${PALETTE.grey23};
`;

export const SelectStyled = styled(Select)`
  &.select-allergen {
    .ant-select-selection-item {
      height: 40px !important;
      width: 40px;
      padding: 0;
      font-size: 18px;
      border-radius: 30px !important;

      .ant-select-selection-item-remove {
        display: none;
      }

      .ant-select-selection-item-content {
        height: 40px !important;
        margin: 0 !important;
        padding: 0 !important;

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
      .ant-select-selection-item {
        height: 36px;
        font-size: 18px;
        font-family: ${FONTS.medium};
        display: flex;
        align-items: center;
        border-radius: ${THEME.borderRadiusS};
        background-color: ${PALETTE.grey16};
        margin-right: 16px;
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
`;

export const OptionStyled = styled(Option)`
  height: 62px;
  font-size: 18px;
  font-family: ${FONTS.medium};
  border-radius: ${THEME.borderRadiusS};
`;

export const Controls = styled.div`
  position: absolute;
  right: 22px;
  top: 10px;
  display: flex;
  flex-direction: row;
  z-index: 1;

  > button {
    &:not(:last-child) {
      margin-right: 24px;
    }
  }
`;

export const Control = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background-color: ${p => (p.active ? `${PALETTE.green1}` : `${PALETTE.grey26}`)};
  border-radius: ${THEME.borderRadiusM};

  > svg {
    width: 18px;
    height: 18px;

    path {
      fill: ${p => (p.active ? `${PALETTE.white}` : `${PALETTE.black1}`)};
    }
  }
`;

export const Img = styled.img`
  width: 38px;
  height: 38px;
  margin-right: 12px;
`;

export const Text = styled.span`
  font-size: 16px;
  font-family: ${FONTS.medium};
  color: ${PALETTE.black};
`;
