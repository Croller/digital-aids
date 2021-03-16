import styled from 'styled-components';
import { Input } from 'client/ui/components/_ui/Input';
import { TextArea } from 'client/ui/components/_ui/TextArea';
import { Button } from 'client/ui/components/_ui/Button/Btn';
import { PALETTE, FONTS, BREAKPOINTS } from 'client/style/constants';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
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
  font-family: ${FONTS.bold};
  font-size: 22px;
  line-height: 34px;
  margin: 0;
  margin-bottom: 22px;
  white-space: pre-line;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    font-size: 28px;
    line-height: 42px;
    margin-bottom: 68px;
  }
`;

export const SpanGreen = styled.span`
  color: ${PALETTE.green1};
`;

export const Hr = styled.hr`
  margin: 22px 0;
  border: 0.4px solid ${PALETTE.grey7};

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    margin: 72px 0 32px;
  }
`;

export const Contact = styled.div`
  font-family: ${FONTS.medium};
  font-size: 16px;
  margin-bottom: 22px;
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
    margin-right: 8px;

    path {
      fill: ${PALETTE.green1}
    }
  }
`;

export const Form = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;

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
  font-family: ${FONTS.regular};
  font-size: 16px;
  margin-bottom: 12px;
  color: ${PALETTE.grey20};
`;

export const InputStyled = styled(Input)`
  height: 60px;
  border: 0;
`;

export const TextAreaStyled = styled(TextArea)`
  border: 0;
  margin-bottom: 32px;
`;

export const SendButton = styled(Button)`
  width: 100%;
  height: 52px;
  margin: 0 auto;
  background-color: ${PALETTE.green1};
  text-transform: uppercase;
  color: ${PALETTE.white};

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    width: 274px;
  }
`;
