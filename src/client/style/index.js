// import MontserratThin from 'client/assets/fonts/Montserrat-Thin.ttf';
import { createGlobalStyle } from 'styled-components';
import { createTheme } from 'styled-breakpoints';
import {
  FONTS,
  PALETTE,
} from './constants';

export const theme = createTheme({
  xs: '0px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
});

export const GlobalStyle = createGlobalStyle`
  body {
    height: 100%;
    margin: 0;
    font-family: ${FONTS.regular} !important;
    color: ${PALETTE.black};
    background-color: ${PALETTE.white};
    overflow-x: hidden;
  }

  /* scroll */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }

  ::-webkit-scrollbar-thumb {
    background: ${PALETTE.grey5};
    border: 0 none ${PALETTE.grey5};
    border-radius: 50px;
  }

  ::-webkit-scrollbar-track {
    background: ${PALETTE.grey3};
    border: 0 none ${PALETTE.grey3};
    border-radius: 50px;
  }

  ::-webkit-scrollbar-corner {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${PALETTE.grey5};
    cursor: pointer;
  }

  ::-webkit-scrollbar-track:hover {
    background: ${PALETTE.grey3};
    cursor: pointer;
  }

  /* import fronts */
  /* @font-face {
    font-family: 'MontserratThin';
    font-style: normal;
    font-weight: 100;
    src: local('MontserratThin'), url(${MontserratThin}) format('truetype');
  } */
`;
