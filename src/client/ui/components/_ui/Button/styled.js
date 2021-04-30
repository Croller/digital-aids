import styled, { css } from 'styled-components';
import { PALETTE, THEME, FONTS } from 'client/style/constants';
import { Spin } from 'antd';

export const Btn = styled.button`
  width: 100%;
  height: 48px;
  background-color: ${PALETTE.grey2};
  border-radius: ${THEME.borderRadiusS};
  border-width: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: ${FONTS.bold};
  color: ${PALETTE.black};
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: none;
  }

  ${p => p.loading && css`
    cursor: not-allowed !important;
    background-color: ${PALETTE.green2} !important;
  `}

  ${p => p.disabled && css`
    cursor: not-allowed !important;
    opacity: 0.4;
  `}
`;

export const SpinStyled = styled(Spin)`
  color: ${PALETTE.white};
  font-size: 14px;
  margin-right: 14px;
`;
