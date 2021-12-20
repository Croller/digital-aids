import { createGlobalStyle } from 'styled-components';

export const PALETTE = {
  white: '#FFFFFF',
  grey: '#79909B',
  grey1: '#9FACAD',
  grey2: '#F5F5F6',
  grey3: '#E9EBED',
  blue: '#3A99D8',
  blue1: '#2D3E4F',
};

export const GlobalStyle = createGlobalStyle`
  body {
    height: 100%;
    margin: 0;
    overflow-x: hidden;
  }
`;
