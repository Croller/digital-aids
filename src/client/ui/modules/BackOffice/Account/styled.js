import styled from 'styled-components';
import {
  FONTS,
  PALETTE,
  THEME,
} from 'client/style/constants';
import { Button } from 'client/ui/components/_ui/Button';
import { IconText } from 'client/ui/components/_block/IconText';
import { Form, Descriptions } from 'antd';
import { InputForm } from 'client/ui/components/_ui/Input';
import MaskedInput from 'antd-mask-input';

const FormItem = Form.Item;
const DescriptionsItem = Descriptions.Item;

export const AccountWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 42px;
`;

export const Title = styled(IconText)`
  font-size: 22px;
  font-family: ${FONTS.semiBold};

  > span > svg {
    width: 33px;
    height: 33px;
    margin-right: 14px;

    path: {
      fill: ${PALETTE.green1};
    }
  }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const Control = styled(Button)`
  background-color: transparent;
  border-width: 0;
  font-size: 16px;
  font-family: ${FONTS.semiBold};
  color: ${PALETTE.green1};

  &:disabled {
    cursor: not-allowed;
    color: ${PALETTE.grey24};
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const ViewStyled = styled(Descriptions)`
  display: flex;
  margin-bottom: 32px;

  .ant-descriptions-view {
    .ant-descriptions-row {
      > th {
        &.ant-descriptions-item {
          padding-bottom: 12px;

          .ant-descriptions-item-label {
            font-size: 16px;
            font-family: ${FONTS.bold};
            color: ${PALETTE.black};
            text-transform: uppercase;
          }
        }
      }

      .ant-descriptions-item-container {
        .ant-descriptions-item-content {
          display: flex;
          flex-wrap: wrap;
          font-size: 16px;
          font-family: ${FONTS.medium};
          color: ${PALETTE.black};

          > img {
            margin-bottom: 8px;
          }
        }
      }
    }
  }
`;

export const ViewItemStyled = styled(DescriptionsItem)`
  display: block;
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

