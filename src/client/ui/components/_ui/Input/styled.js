import styled, { css } from 'styled-components';
import { PALETTE, THEME, FONTS } from 'client/style/constants';
import { Input } from 'antd';

export const InputStyled = styled(Input)`
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

  .ant-input-disabled {
    background-color: ${PALETTE.grey29} !important;
    color: ${PALETTE.grey6};
  }

  &.ant-input-affix-wrapper {
    border-width: 0;
    border-color: transparent !important;

    &:not(.ant-input-affix-wrapper-disabled) {
      &:hover {
        border-width: 0;
        border-color: transparent !important;
      }
    }
  }

  ${p => p.suffix && css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;

    input {
      width: 100%;
      height: inherit;
      border: 0;

      &:focus {
        outline: none;
        border-color: ${PALETTE.grey6};
        box-shadow: unset;
      }
    }
  `}

  ${p => p.addonAfter && css`
    padding: 0;

    .ant-input-group {
      height: 48px;
      border: 0;

      .ant-input {
        height: 47px;
        border-color: transparent;
        background: transparent;
        font-size: 16px;
        font-family: ${FONTS.regular};
      }

      .ant-input-group-addon {
        font-size: 16px;
        font-family: ${FONTS.regular};
        border: 0;

        .ant-select {
          .ant-select-selector {
            border: 0;
            min-width: 155px;
            border-left: 1px solid ${PALETTE.grey3};

            .ant-select-selection-item {
              font-size: 16px;
              font-family: ${FONTS.regular};
            }
          }
        }
      }
    }
  `}
`;
