import styled from 'styled-components';
import { PALETTE, FONTS, BREAKPOINTS } from 'client/style/constants';
import { InputForm } from 'client/ui/components/_ui/Input';
import { TextAreaForm } from 'client/ui/components/_ui/TextArea';
import { Button } from 'client/ui/components/_ui/Button';
import { Form } from 'antd';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

export const Contacts = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 48px;

  > svg {
    width: 85px;
    height: 85px;

    path {
      fill: ${PALETTE.green1}
    }
  }

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    width: 772px;
    flex: 0 50%;

    > svg {
      width: 138px;
      height: 138px;
    }
  }
`;

export const Title = styled.h3`
  margin: 0;
  margin-bottom: 22px;
  font-family: ${FONTS.bold};
  font-size: 22px;
  line-height: 34px;
  white-space: pre-line;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    margin-bottom: 68px;
    font-size: 28px;
    line-height: 42px;
  }
`;

export const SpanGreen = styled.span`
  color: ${PALETTE.green1};
`;

export const Hr = styled.hr`
  border: 0.4px solid ${PALETTE.grey7};
  margin: 22px 0;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    margin: 72px 0 32px;
  }
`;

export const Contact = styled.div`
  margin-bottom: 22px;
  cursor: pointer;
  font-family: ${FONTS.medium};
  font-size: 16px;

  svg {
    width: 16px;
    height: 16px;
    margin-right: 8px;

    path {
      fill: ${PALETTE.green1}
    }
  }
`;

export const FormStyled = styled(Form)`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;

  > div {
    &:last-child {
      margin-bottom: 0;
    }
  }

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    flex: 0 50%;
  }
`;

export const Control = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 22px;
`;

export const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    flex-direction: row;

    > div {
      flex: 0 50%;

      &:first-child {
        margin-right: 22px;
      }
    }
  }
`;

export const Label = styled.label`
  margin-bottom: 12px;
  color: ${PALETTE.grey20};
  font-family: ${FONTS.regular};
  font-size: 16px;
`;

export const InputStyled = styled(InputForm)`
  height: 60px;
  border: 0;
`;

export const TextAreaStyled = styled(TextAreaForm)`
  border: 0;
  margin-bottom: 32px;
`;

export const SendButton = styled(Button)`
  width: 100%;
  height: 52px;
  margin: 0 auto;
  background-color: ${PALETTE.green1};
  color: ${PALETTE.white};
  text-transform: uppercase;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    width: 274px;
  }
`;
