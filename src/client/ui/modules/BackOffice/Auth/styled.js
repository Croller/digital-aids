import styled from 'styled-components';
import { FONTS, PALETTE, THEME } from 'client/style/constants';
import { Form } from 'antd';
import { Button } from 'client/ui/components/_ui/Button';
import { Input } from 'client/ui/components/_ui/Input';
import { Link } from 'client/ui/components/_ui/Link';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 97px);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 97px);
  max-width: 589px;
  width: 100%;
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;

  > svg {
    width: 33px;
    height: 33px;
    margin-right: 12px;

    path {
      fill: ${PALETTE.green1};
    }
  }
`;

export const LogoText = styled.div`
  font-family: ${FONTS.semiBold};
  font-size: 22px;
  text-transform: uppercase;
`;

export const FormStyled = styled(Form)`
  width: 100%;

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
            display: none;
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

export const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 48px;
`;

export const InputStyled = styled(Input)`
  height: 62px;
  font-size: 18px;
  font-family: ${FONTS.medium};
  border-radius: ${THEME.borderRadiusL};
`;

export const ControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .ant-form-item {
    margin-bottom: 0;

    &:not(:last-child) {
      margin-bottom: 48px;
    }
  }
`;

export const Login = styled(Button)`
  width: 202px;
  height: 62px;
  background-color: ${PALETTE.green1};
  font-family: ${FONTS.semiBold};
  font-size: 18px;
  color: ${PALETTE.white};
  text-transform: uppercase;
`;

export const Signup = styled(Link)`
  font-family: ${FONTS.semiBold};
  font-size: 18px;
  color: ${PALETTE.green1};
  text-transform: uppercase;
`;
