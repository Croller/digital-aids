import styled from 'styled-components';
import { FONTS, PALETTE, THEME } from 'client/style/constants';
import { Topbar } from 'client/ui/components/Navbar/BackOffice/Topbar';
import { Form, Select } from 'antd';
import { Input } from 'client/ui/components/_ui/Input';
import { Button } from 'client/ui/components/_ui/Button';
import MaskedInput from 'antd-mask-input';
import { Uploader } from 'client/ui/components/_ui/Uploader';

const FormItem = Form.Item;
const { Option } = Select;

export const Wrapper = styled.div`
  width: 100%;
`;

export const TopbarStyled = styled(Topbar)`
  margin-bottom: 46px;
`;

export const FormStyled = styled(Form)`
  width: 100%;
  margin-bottom: 80px;

  .ant-form-item {
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
      padding: 0 0 18px;

      label {
        font-size: 16px;
        font-family: ${FONTS.bold};
        color: ${PALETTE.black};
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
  }
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
  margin-bottom: 102px;

  > div {
    width: 50%;

    &:not(:last-child) {
      margin-right: 26px;
    }
  }
`;

export const InputStyled = styled(Input)`
  height: 62px;
  font-size: 18px;
  font-family: ${FONTS.medium};
  border-radius: ${THEME.borderRadiusL};
`;

export const InputMaskStyled = styled(MaskedInput)`
  width: 100%;
  border-radius: ${THEME.borderRadiusS};
  border: 1px solid ${PALETTE.grey6};
  padding: 18px 22px;
  font-family: ${FONTS.regular};
  font-size: 16px;
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
  &.ant-select {
    .ant-select-selector {
      height: 62px !important;
      background-color: ${PALETTE.white};
      border: 1px solid ${PALETTE.grey6};
      border-radius: ${THEME.borderRadiusL};
      padding: 0 18px;
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

    &.ant-select-multiple {
      .ant-select-selection-item {
        height: 48px;
        font-size: 18px;
        font-family: ${FONTS.medium};
        display: flex;
        align-items: center;
        border-radius: ${THEME.borderRadiusL};
        background-color: ${PALETTE.grey16};
        padding-right: 12px;
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

export const FormItemSubmit = styled(FormItem)`
  display: flex;
  justify-content: center;
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
`;

export const FormUploader = styled.div`
  position: relative;
`;

export const UploaderLogo = styled(Uploader)`
  img {
    width: 100%;
    height: 180px;
  }
`;

export const UploaderPhotos = styled(Uploader)`
  .list-images {
    > div {
      &:nth-child(3n) {
        margin-right: 0;
      }

      img {
        width: 205px;
      }
    }
  }
`;

