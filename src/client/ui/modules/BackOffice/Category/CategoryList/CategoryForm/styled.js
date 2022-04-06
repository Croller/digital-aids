import styled, { css } from 'styled-components';
import { FONTS, PALETTE, THEME } from 'client/style/constants';
import { Form, Select, Radio } from 'antd';
import { InputForm } from 'client/ui/components/_ui/Input';
import { TextAreaForm } from 'client/ui/components/_ui/TextArea';
import { Button } from 'client/ui/components/_ui/Button';
import MaskedInput from 'antd-mask-input';

const FormItem = Form.Item;
const { Option } = Select;

export const CategoryFormWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 0 20px 0 20px;
  background-color: ${PALETTE.white};
  border-radius: ${THEME.borderRadiusL};
  box-shadow: ${THEME.boxShadow1};
`;

export const FormStyled = styled(Form)`
  width: 100%;
  margin-top: 22px;
`;

export const FormCol = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const Form2Col = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;

  > div {
    width: 50%;
    margin-bottom: unset;

    &:not(:last-child) {
      margin-right: 26px;
    }
  }
`;

export const InputStyled = styled(InputForm)`
  height: 48px;
  border-radius: ${THEME.borderRadiusS};
  font-family: ${FONTS.medium};
  font-size: 18px;

  ${p => p.addonAfter && css`
    padding: 0;

    .ant-input-group {
      height: 48px;
      border: 0;

      .ant-input {
        color: ${PALETTE.black};
        font-family: ${FONTS.medium};
        font-size: 18px;

        &:focus {
          box-shadow: none;
        }
      }

      .ant-input-group-addon {
        padding: 4px 18px;
        border: 0;
        border-left: 1px solid ${PALETTE.grey3};
        background: transparent;
        font-family: ${FONTS.medium};
        font-size: 18px;
      }
    }
  `}
`;

export const TextAreaStyled = styled(TextAreaForm)`
  min-height: 48px !important;
  border-radius: ${THEME.borderRadiusS};
  font-family: ${FONTS.medium};
  font-size: 18px;
  line-height: 22px !important;

  &.info {
    height: 48px !important;
  }
`;

export const InputMaskStyled = styled(MaskedInput)`
  width: 100%;
  padding: 8px 22px;
  border: 1px solid ${PALETTE.grey6};
  background-color: ${PALETTE.white};
  border-radius: ${THEME.borderRadiusL};
  color: ${PALETTE.black};
  font-family: ${FONTS.medium};
  font-size: 18px;
  text-align: center;

  &:hover {
    border-color: ${PALETTE.grey3}
  }

  &:focus {
    border-color: ${PALETTE.grey6};
    box-shadow: unset;
    outline: none;
  }
`;

export const Hr = styled.hr`
  border: 1px solid ${PALETTE.grey23};
  margin: 8px 0 30px;
`;

export const SelectStyled = styled(Select)`
  &.ant-select {
    .ant-select-selector {
      display: flex;
      min-height: 48px !important;
      align-items: center;
      padding: 4px 18px;
      border: 1px solid ${PALETTE.grey6};
      background-color: ${PALETTE.white};
      border-radius: ${THEME.borderRadiusS};

      .ant-select-selection-item {
        display: flex;
        height: 48px;
        align-items: center;
        font-family: ${FONTS.medium};
        font-size: 18px;

        .ant-select-selection-item-content {
          display: flex;
          height: 48px;
          align-items: center;
        }

        .ant-select-selection-item-remove {
          font-family: ${FONTS.medium};
          font-size: 17px;

          > svg {
            stroke-width: 20px;
          }
        }
      }

      .ant-select-selection-search {
        margin-top: -3px;
        font-family: ${FONTS.regular};
        font-size: 16px;
      }

      .ant-select-selection-placeholder {
        display: flex;
        align-items: center;
        font-family: ${FONTS.medium};
        font-size: 18px;
      }
    }

    .ant-select-arrow {
      top: 52%;
      right: 28px !important;
      color: ${PALETTE.black};
      font-size: 20px;
    }

    &:hover {
      .ant-select-selector {
        border-color: ${PALETTE.grey6} !important;
        box-shadow: unset !important;
      }
    }

    &.ant-select-focused {
      .ant-select-selector {
        border-color: ${PALETTE.grey6} !important;
        box-shadow: unset !important;
        outline: none !important;
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
          display: flex;
          height: 36px;
          align-items: center;
          margin-right: 6px;
          background-color: ${PALETTE.grey16};
          border-radius: ${THEME.borderRadiusS};
          color: ${PALETTE.black};
          font-family: ${FONTS.medium};
          font-size: 18px;

          .ant-select-selection-item-content {
            display: flex;
            height: 36px;
            align-items: center;
            padding: 4px 8px;
          }

          .ant-select-selection-item-remove {
            font-family: ${FONTS.medium};
            font-size: 17px;

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
  border-radius: ${THEME.borderRadiusS};
  font-family: ${FONTS.medium};
  font-size: 18px;
`;

export const FormItemStyled = styled(FormItem)`
  margin-bottom: 22px;

  &.ant-form-item-has-success {
    .ant-form-item-children-icon {
      position: absolute;
      z-index: 1;
      top: 34px;
      right: 15px;
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
        box-shadow: unset;
        outline: none;
      }
    }

    .ant-form-item-children-icon {
      position: absolute;
      z-index: 1;
      top: 34px;
      right: 15px;
      width: 17px;
      height: 14px;
      font-size: 15px;
    }

    .ant-form-item-explain-error {
      position: absolute;
      right: 0;
      bottom: -23px;
      font-family: ${FONTS.medium};
      font-size: 13px;
    }
  }

  .ant-form-item-label {
    padding: 0 0 12px;

    label {
      color: ${PALETTE.grey12};
      font-family: ${FONTS.bold};
      font-size: 16px;
      text-transform: uppercase;

      svg {
        width: 22px;
        height: 22px;
        margin-right: 8px;
      }

      &.ant-form-item-required {
        &::before {
          display: none !important;
        }

        &::after {
          display: block;
          margin-left: 4px;
          color: ${PALETTE.red2};
          content: '*';
          font-family: ${FONTS.bold};
          font-size: 16px;
          line-height: 1;
        }
      }
    }
  }
`;

export const Controls = styled.div`
  position: absolute;
  z-index: 1;
  top: 12px;
  right: 22px;
  display: flex;
  flex-direction: row;

  > button {
    &:not(:last-child) {
      margin-right: 18px;
    }
  }
`;

export const Control = styled(Button)`
  display: flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  padding: 0;
  background-color: ${p => (p.active ? `${PALETTE.green1}` : `${PALETTE.grey26}`)};
  border-radius: ${THEME.borderRadiusM};

  > svg {
    width: 16px;
    height: 16px;

    path {
      fill: ${p => (p.active ? `${PALETTE.white}` : `${PALETTE.black1}`)};
    }
  }
`;

export const Separator = styled.span`
  display: flex;
  width: 36px;
  align-items: center;
  justify-content: center;
  font-family: ${FONTS.bold};
  font-size: 20px;
`;

export const FormRange = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .ant-form-item {
    width: 48%;
    margin-bottom: 0;
  }
`;

export const RadioGroup = styled(Radio.Group)`
  display: flex;
`;

export const RadioButton = styled(Radio.Button)`
  display: flex;
  width: 13.3%;
  height: 40px;
  align-items: center;
  justify-content: center;
  border: 0 !important;
  background-color: ${PALETTE.grey16} !important;
  border-radius: ${THEME.borderRadiusM} !important;
  box-shadow: unset !important;
  color: ${PALETTE.black} !important;
  font-family: ${FONTS.medium};
  font-size: 18px !important;

  &.ant-radio-button-wrapper-checked {
    background-color: ${PALETTE.green1} !important;
    color: ${PALETTE.white} !important;
  }

  &:not(:last-child) {
    margin-right: 6px;
  }

  &::before {
    display: none !important;
  }
`;

export const Group2Form = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  > div {
    width: 48%;
  }
`;

export const GroupForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;

  .ant-form-item {
    width: 100%;
    margin-bottom: 0;
  }
`;

export const GroupControl = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

export const AddGroup = styled(Button)`
  width: 170px;
  height: 38px;
  margin-bottom: 16px;
  background-color: transparent;
  color: ${PALETTE.green1};
  font-family: ${FONTS.semiBold};
  font-size: 16px;
  text-transform: uppercase;

  > svg {
    width: 22px;
    height: 22px;
    margin-left: 10px;

    path {
      fill: ${PALETTE.green1};
    }
  }
`;

