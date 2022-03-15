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
  border-radius: ${THEME.borderRadiusL};
  background-color: ${PALETTE.white};
  box-shadow: ${THEME.boxShadow1};
  padding: 0 20px 0 20px;
`;

export const FormStyled = styled(Form)`
  margin-top: 22px;
  width: 100%;
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

        &:focus {
          box-shadow: none;
        }
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
  `}
`;

export const TextAreaStyled = styled(TextAreaForm)`
  font-size: 18px;
  font-family: ${FONTS.medium};
  border-radius: ${THEME.borderRadiusS};
  min-height: 48px !important;
  line-height: 22px !important;

  &.info {
    height: 48px !important;
  }
`;

export const InputMaskStyled = styled(MaskedInput)`
  width: 100%;
  border-radius: ${THEME.borderRadiusL};
  border: 1px solid ${PALETTE.grey6};
  padding: 8px 22px;
  font-family: ${FONTS.medium};
  font-size: 18px;
  color: ${PALETTE.black};
  background-color: ${PALETTE.white};
  text-align: center;

  &:hover {
    border-color: ${PALETTE.grey3}
  }

  &:focus {
    outline: none;
    border-color: ${PALETTE.grey6};
    box-shadow: unset;
  }
`;

export const Hr = styled.hr`
  margin: 8px 0 30px;
  border: 1px solid ${PALETTE.grey23};
`;

export const SelectStyled = styled(Select)`
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
          margin-right: 6px;
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

export const FormItemStyled = styled(FormItem)`
  margin-bottom: 22px;

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

export const Controls = styled.div`
  position: absolute;
  right: 22px;
  top: 12px;
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

export const Separator = styled.span`
  width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-family: ${FONTS.bold};
`;

export const FormRange = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

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
  justify-content: center;
  align-items: center;
  width: 13.3%;
  height: 40px;
  font-size: 18px !important;
  font-family: ${FONTS.medium};
  border-radius: ${THEME.borderRadiusM} !important;
  background-color: ${PALETTE.grey16} !important;
  color: ${PALETTE.black} !important;
  border: 0 !important;
  box-shadow: unset !important;

  &.ant-radio-button-wrapper-checked {
    color: ${PALETTE.white} !important;
    background-color: ${PALETTE.green1} !important;
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
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  > div {
    width: 48%;
  }
`;

export const GroupForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;

  .ant-form-item {
    width: 100%;
    margin-bottom: 0;
  }
`;

export const GroupControl = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

export const AddGroup = styled(Button)`
  height: 38px;
  width: 170px;
  background-color: transparent;
  color: ${PALETTE.green1};
  text-transform: uppercase;
  font-family: ${FONTS.semiBold};
  font-size: 16px;
  margin-bottom: 16px;

  > svg {
    width: 22px;
    height: 22px;
    margin-left: 10px;

    path {
      fill: ${PALETTE.green1};
    }
  }
`;

