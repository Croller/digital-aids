import styled, { css } from 'styled-components';
import { PALETTE, THEME, FONTS } from 'client/style/constants';
import { Input } from 'antd';

export const InputStyled = styled(Input)`
  width: 100%;
  border-radius: ${THEME.borderRadiusControl};
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
`;
