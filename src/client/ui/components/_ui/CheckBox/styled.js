import styled, { css } from 'styled-components';
import { PALETTE, THEME, FONTS } from 'client/style/constants';

export const Wrapper = styled.button`
  cursor: pointer;

  ${p => (p.text ? css`
    width: auto;
    height: 35px;
    background-color: transparent;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    font-size: 16px;
    font-family: ${FONTS.bold};
    color: ${PALETTE.black};
    border: 0;
  ` : css`
    background-color: ${PALETTE.white};
    border-radius: ${THEME.borderRadiusS};
    border: 1px solid ${PALETTE.black};
    padding: 0;
  `)}

  &:focus {
    outline: none;
  }
`;

export const Check = styled.div`
  width: 35px;
  height: 35px;
  background-color: ${PALETTE.white};
  border-radius: ${THEME.borderRadiusS};
  border: 1px solid ${PALETTE.black};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: ${p => (p.text ? '6px' : 0)};

  > svg {
    width: 17px;
    height: 17px;

    path {
      fill: ${PALETTE.black};
    }
  }
`;

export const Container = styled.div`
  font-size: 16px;
  font-family: ${FONTS.bold};
  color: ${PALETTE.black};
`;
