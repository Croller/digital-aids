import styled from 'styled-components';
import { FONTS, PALETTE, THEME } from 'client/style/constants';
import { NavBar } from 'client/ui/modules/BackOffice/components/NavBar';
import { NavItem } from 'client/ui/modules/BackOffice/components/NavItem';
import { Form, Select, Radio } from 'antd';
import { InputForm } from 'client/ui/components/_ui/Input';
import { Button } from 'client/ui/components/_ui/Button';
import MaskedInput from 'antd-mask-input';
import { Uploader } from 'client/ui/components/_ui/Uploader';
import { GoogleMap } from 'client/ui/modules/Restaurant/components/GoogleMap';

const FormItem = Form.Item;
const { Option } = Select;

export const RestaurantWrapper = styled.div`
  width: 100%;
`;

export const NavBarStyled = styled(NavBar)`
  margin-bottom: 46px;
`;

export const FormStyled = styled(Form)`
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
      right: 28px;
      color: ${PALETTE.black};
    }

    &:hover {
      .ant-select-selector {
        border-color: ${PALETTE.grey6};
        box-shadow: unset;
      }
    }

    &.ant-select-focused {
      .ant-select-selector {
        outline: none;
        border-color: ${PALETTE.grey6};
        box-shadow: unset;
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
          height: 48px;
          font-size: 18px;
          font-family: ${FONTS.medium};
          display: flex;
          align-items: center;
          border-radius: ${THEME.borderRadiusL};
          background-color: ${PALETTE.grey16};
          margin-right: 6px;
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
  }
`;

export const OptionStyled = styled(Option)`
  height: 62px;
  font-size: 18px;
  font-family: ${FONTS.medium};
  border-radius: ${THEME.borderRadiusL};
`;

export const UpperCase = styled.span`
  text-transform: uppercase;
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

export const NavItemStyled = styled(NavItem)`
  margin: 10px 0 18px;
`;

export const FormUploader = styled.div`
  position: relative;
`;

export const UploaderLogo = styled(Uploader)`
  .list-images {
    > div {
      width: auto;

      img {
        width: 556px;
        height: 180px;
      }
    }
  }
`;

export const UploaderPhotos = styled(Uploader)`
  .ant-upload-select-picture-card {
    margin-bottom: 20px;
  }

  .list-images {
    > div {
      width: 267px;

      &:nth-child(3n) {
        margin-right: 0;
      }

      img {
        width: 267;
        height: 180px;
      }

      &:first-child {
        width: 556px;

        img {
          width: 556px;
          height: 180px;
        }
      }
    }
  }
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
  margin-bottom: 80px;
  border-radius: ${THEME.borderRadiusL};
`;

export const AddressItemsWrapper = styled.div`
  position: relative;
`;

export const AddressList = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  top: -23px;
  left: 0;
  z-index: 2;
`;

export const AddressItem = styled.li`
  margin: 0;
  padding: 7px 8px;
  font-size: 16px;
  font-family: ${FONTS.semiBold};
  border: 1px solid ${PALETTE.grey6};
  background-color: ${PALETTE.white};

  &:first-child {
    border-top-right-radius: ${THEME.borderRadiusM};
    border-top-left-radius: ${THEME.borderRadiusM};
  }

  &:last-child {
    border-bottom-right-radius: ${THEME.borderRadiusM};
    border-bottom-left-radius: ${THEME.borderRadiusM};
  }

  &:not(:last-child) {
    border-bottom: 0;
  }

  &:hover {
    background-color: ${PALETTE.grey25};
    cursor: pointer;
  }
`;

export const MapStyled = styled(GoogleMap)`
  position: relative !important;
  width: 100% !important;
  height: 180px !important;
  margin-bottom: 22px;
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
