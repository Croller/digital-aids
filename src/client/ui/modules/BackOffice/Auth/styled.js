import styled from 'styled-components';
import { FONTS, PALETTE, THEME } from 'client/style/constants';
import { Form } from 'antd';
import { Button } from 'client/ui/components/_ui/Button';
import { Input } from 'client/ui/components/_ui/Input';

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

  .ant-form-item-has-success {
    .ant-form-item-children-icon {
      font-size: 20px;
      top: 50%;
      right: 6px;
      width: 26px;
      height: 22px;
    }
  }

  .ant-form-item-has-error {
    .ant-input {
      border-color: ${PALETTE.red2};

      &:focus {
        outline: none;
        box-shadow: unset;
      }
    }

    .ant-form-item-children-icon {
      font-size: 20px;
      top: 50%;
      right: 6px;
      width: 26px;
      height: 22px;
    }

    .ant-form-item-explain-error {
      font-size: 16px;
      font-family: ${FONTS.medium};
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
  font-size: 18px;
  font-family: ${FONTS.medium};
  border-radius: ${THEME.borderRadiusForm};
`;

export const ControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Login = styled(Button)`
  width: 202px;
  height: 62px;
  background-color: ${PALETTE.green1};
  margin-bottom: 32px;
  font-family: ${FONTS.semiBold};
  font-size: 18px;
  color: ${PALETTE.white};
  text-transform: uppercase;
`;

export const Signup = styled(Button)`
  width: 202px;
  height: 62px;
  background-color: transparent;
  font-family: ${FONTS.semiBold};
  font-size: 18px;
  color: ${PALETTE.green1};
  text-transform: uppercase;
`;
