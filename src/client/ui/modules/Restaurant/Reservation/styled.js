import styled, { css } from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button';
import { PALETTE, FONTS, THEME } from 'client/style/constants';
import Calendar from 'react-calendar';
import { IconText } from 'client/ui/components/_block/IconText'; 
import {
  Form,
  Input,
  Checkbox,
  Descriptions,
} from 'antd';

const FormItem = Form.Item;
const DescriptionsItem = Descriptions.Item;

export const ReservationWrapper = styled.div`
  display: block;
  position: relative;
`;

export const CloseButton = styled(Button)`
  position: absolute;
  top: 18px;
  right: 18px;
  width: 30px;
  height: 30px;
  padding: 0;
  background-color: ${PALETTE.white};
  box-shadow: ${THEME.boxShadow2};
  z-index: 25;

  > svg {
    width: 18px;
    height: 18px;

    path {
      fill: ${PALETTE.grey8};
    }
  }
`;

export const ImgWrapper = styled.div`
  width: 100%;
  min-height: 217px;
`;

export const Img = styled.img`
  width: 100%;
  height: 217px;
  object-position: 0 0;
  object-fit: cover;
`;

export const Content = styled.div`
  position: relative;
  padding: 0 22px;
  margin-top: -84px;
  z-index: 25;
`;

export const Restaurant = styled.h2`
  font-size: 20px;
  font-family: ${FONTS.semiBold};
  color: ${PALETTE.white};
  margin: 0;
  margin-bottom: 12px;
`;

export const Title = styled.h4`
  font-size: 18px;
  font-family: ${FONTS.semiBold};
  color: ${PALETTE.white};
  margin: 0;
  margin-bottom: 36px;
`;

export const Tab = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 26px;
`;

export const TabButton = styled(Button)`
  min-width: 101px;
  height: 30px;
  font-family: ${FONTS.medium};
  text-transform: uppercase;
  color: ${PALETTE.black};
  background-color: ${PALETTE.grey2};
  border-radius: 3px;
  box-shadow: unset;
  box-shadow: ${THEME.boxShadow1};

  &:not(:last-child) {
    margin-right: 10px;
  }

  ${p => p.active && css`
    background-color: ${PALETTE.green1};

    > span {
      color: ${PALETTE.white};

      > span > svg {
        path {
          fill: ${PALETTE.white};
        }
      }
    }
  `}
`;

export const TabIconText = styled(IconText)`
  font-family: ${FONTS.semiBold};
  font-size: 12px;

  > span > svg {
    width: 18px;
    height: 18px;
    margin-right: 6px;

    path {
      fill: ${PALETTE.black};
    }
  }
`;

export const CalendarStyled = styled(Calendar)`
  display: block;
  width: 316px;
  margin: 0 auto;
  background-color: ${PALETTE.white};
  margin-bottom: 42px;

  button {
    &:focus {
      outline: none;
    }
  }

  .react-calendar__navigation {
    margin-bottom: 20px;

    .react-calendar__navigation__prev2-button,
    .react-calendar__navigation__next2-button {
      display: none;
    }

    .react-calendar__navigation__prev-button,
    .react-calendar__navigation__next-button {
      width: 35px;
      height: 35px;
      background-color: ${PALETTE.white};
      border: 1px solid ${PALETTE.grey2};
      color: ${PALETTE.grey2};
      border-radius: ${THEME.borderRadiusS};
      font-size: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 5px;
    }

    .react-calendar__navigation__label {
      background-color: transparent;
      border-width: 0;

      .react-calendar__navigation__label__labelText {
        font-size: 18px;
        font-family: ${FONTS.semiBold};
        text-transform: uppercase;
      }
    }
  }

  .react-calendar__month-view__weekdays {
    margin-bottom: 20px;

    .react-calendar__month-view__weekdays__weekday {
      flex-basis: 43.3px !important;
      font-size: 12px;
      font-family: ${FONTS.semiBold};
      color: ${PALETTE.grey12};
      text-transform: uppercase;
      text-align: center;
      border: 1px solid transparent;

      > abbr {
        text-decoration: unset;
      }

      &:not(:last-child) {
        margin-right: 1px;
      }
    }
  }

  .react-calendar__month-view__days {
    .react-calendar__month-view__days__day {
      flex-basis: 43px !important;
      height: 43px !important;
      font-size: 16px;
      font-family: ${FONTS.semiBold};
      color: ${PALETTE.black};
      background-color: ${PALETTE.white};
      border: 1px solid ${PALETTE.grey2};
      border-radius: 3px;
      margin: 1px;
      padding: 0;
    }

    .react-calendar__tile--active {
      color: ${PALETTE.white};
      background-color: ${PALETTE.green1};
    }

    .react-calendar__month-view__days__day--neighboringMonth {
      border-width: 0;
      color: transparent;
    }
  }
`;

export const TabTitle = styled.h4`
  font-size: 18px;
  font-family: ${FONTS.semiBold};
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 12px;
`;

export const SquareWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 62px;

  ${p => p.key === 'persons' && css`
    margin-bottom: 234px;
  `}
`;

export const Square = styled(Button)`
  width: 19%;
  height: 43px;
  font-size: 16px;
  font-family: ${FONTS.semiBold};
  color: ${PALETTE.black};
  background-color: ${PALETTE.white};
  border: 1px solid ${PALETTE.grey2};
  border-radius: 3px;
  margin: 0.5px;

  ${p => p.active && css`
    background-color: ${PALETTE.green1};
    color: ${PALETTE.white};
  `}
`;

export const SubButton = styled(Button)`
  width: 144px;
  min-height: 48px;
  font-size: 16px;
  font-family: ${FONTS.medium};
  text-transform: uppercase;
  box-shadow: ${THEME.boxShadow1};
  color: ${PALETTE.black};
  background-color: ${PALETTE.grey2};
  margin: 0 auto;
  margin-bottom: 84px;

  ${p => p.active && css`
    min-width: 244px;
    background-color: ${PALETTE.green1};
    color: ${PALETTE.white};
  `}
`;

export const ViewStyled = styled(Descriptions)`
  display: flex;

  .ant-descriptions-view {
    .ant-descriptions-row {
      > th {
        &.ant-descriptions-item {
          padding-bottom: 0;

          .ant-descriptions-item-label {
            font-size: 14px;
            font-family: ${FONTS.semiBold};
            color: ${PALETTE.grey12};
            text-transform: uppercase;
          }
        }
      }

      .ant-descriptions-item-container {
        .ant-descriptions-item-content {
          display: flex;
          flex-wrap: wrap;
          font-size: 18px;
          font-family: ${FONTS.semiBold};
          color: ${PALETTE.black};
        }
      }
    }
  }
`;

export const ViewItem = styled(DescriptionsItem)`
  display: block;
`;

export const FormStyled = styled(Form)`
  width: 100%;
  margin-bottom: 22px;
  border-radius: ${THEME.borderRadiusM};
  background-color: ${PALETTE.white};
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

    .ant-form-item-explain-error {
      position: absolute;
      bottom: -23px;
      right: 0;
      font-size: 13px;
      font-family: ${FONTS.medium};
    }
  }

  .ant-form-item-label {
    padding: 0 0 8px;

    label {
      font-size: 14px;
      font-family: ${FONTS.semiBold};
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
          font-size: 14px;
          font-family: ${FONTS.bold};
          line-height: 1;
          content: '*';
        }
      }
    }
  }
`;

export const InputStyled = styled(Input)`
  height: 48px;
  font-size: 16px;
  font-family: ${FONTS.medium};
  border-color: ${PALETTE.grey6};
  border-radius: ${THEME.borderRadiusS};

  &:focus {
    background-color: ${PALETTE.white};
    outline: none;
  }

  &:hover {
    border-color: ${PALETTE.grey6};
    box-shadow: unset;
  }
`;

export const CheckBoxStyled = styled(Checkbox)`
  font-size: 18px !important;
  margin-bottom: 72px;

  .ant-checkbox-inner {
    margin-right: 11px;
    width: 24px;
    height: 24px;
    border-radius: ${THEME.borderRadiusS};
    border-color: ${PALETTE.black};
    background-color: ${PALETTE.white};

    &::after {
      width: 8px;
      height: 14px;
      transform: rotate(45deg) scale(1) translate(-40%, -60%);
    }
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    border-color: ${PALETTE.black};

    &::after {
      border: 2px solid ${PALETTE.black};
      border-top: 0;
      border-left: 0;
    }
  }

  .ant-checkbox-checked {
    &::after {
      border: none;
    }
  }
`;

export const LinkText = styled.span`
  text-decoration: underline;
`;
