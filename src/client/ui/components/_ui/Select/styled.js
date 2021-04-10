import styled from 'styled-components';
import { FONTS, PALETTE, THEME } from 'client/style/constants';
import { Select } from 'antd';

const { Option } = Select;

export const SelectStyled = styled(Select)`
  &.ant-select {
    .ant-select-selector {
      min-height: 62px !important;
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

          > svg {
            stroke-width: 20px;
          }
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

    &.ant-select-single {
      .ant-select-selection-search {
        > input {
          height: 100%;
        }
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
        margin-right: 16px;
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
`;

export const OptionStyled = styled(Option)`
  height: 62px;
  font-size: 18px;
  font-family: ${FONTS.medium};
  border-radius: ${THEME.borderRadiusL};
`;
