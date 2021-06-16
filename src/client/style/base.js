import { createGlobalStyle } from 'styled-components';

import MontserratThin from 'client/assets/fonts/Montserrat-Thin.ttf';
import MontserratThinItalic from 'client/assets/fonts/Montserrat-ThinItalic.ttf';
import MontserratExtraLight from 'client/assets/fonts/Montserrat-ExtraLight.ttf';
import MontserratExtraLightItalic from 'client/assets/fonts/Montserrat-ExtraLightItalic.ttf';
import MontserratLight from 'client/assets/fonts/Montserrat-Light.ttf';
import MontserratLightItalic from 'client/assets/fonts/Montserrat-LightItalic.ttf';
import MontserratRegular from 'client/assets/fonts/Montserrat-Regular.ttf';
import MontserratItalic from 'client/assets/fonts/Montserrat-Italic.ttf';
import MontserratMedium from 'client/assets/fonts/Montserrat-Medium.ttf';
import MontserratMediumItalic from 'client/assets/fonts/Montserrat-MediumItalic.ttf';
import MontserratSemiBold from 'client/assets/fonts/Montserrat-SemiBold.ttf';
import MontserratSemiBoldItalic from 'client/assets/fonts/Montserrat-SemiBoldItalic.ttf';
import MontserratBold from 'client/assets/fonts/Montserrat-Bold.ttf';
import MontserratBoldItalic from 'client/assets/fonts/Montserrat-BoldItalic.ttf';
import MontserratExtraBold from 'client/assets/fonts/Montserrat-ExtraBold.ttf';
import MontserratExtraBoldItalic from 'client/assets/fonts/Montserrat-ExtraBoldItalic.ttf';
import MontserratBlack from 'client/assets/fonts/Montserrat-Black.ttf';
import MontserratBlackItalic from 'client/assets/fonts/Montserrat-BlackItalic.ttf';
import MontagaRegular from 'client/assets/fonts/Montaga-Regular.ttf';

import {
  FONTS,
  PALETTE,
  THEME,
} from './constants';

export const GlobalStyle = createGlobalStyle`
  body {
    height: 100%;
    margin: 0;
    font-family: ${FONTS.regular} !important;
    color: ${PALETTE.black};
    background-color: ${PALETTE.white};
    overflow-x: hidden;
  }

  [ant-click-animating-without-extra-node]::after {
    animation: 0s !important;
  }

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

  /* input number hide arraows */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

  /* styled ant design global */

  /* message */
  .ant-message {
    .ant-message-notice-content {
      cursor: pointer;

      .ant-message-custom-content {
        font-size: 20px;
        display: flex;
        align-items: center;

        .anticon {
          font-size: 20px;
        }
      }
    }
  }

  /* select */
  .ant-select-dropdown {
    padding: 0;
    border: 1px solid ${PALETTE.grey6};
    border-radius: ${THEME.borderRadiusL};

    .ant-select-item {
      height: 60px;
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: ${FONTS.medium};
      color: ${PALETTE.grey12};

      &.ant-select-item-option-active {
        background-color: ${PALETTE.grey16};
        color: ${PALETTE.black};
      }

      &.ant-select-item-option-selected {
        background-color: ${PALETTE.grey16};
        color: ${PALETTE.black};

        .ant-select-item-option-state {
          svg {
            path: {
              fill: ${PALETTE.green1};
            }
          }
        }
      }
    }
  }

  /* import fronts */

  @font-face {
    font-family: 'MontserratThin';
    font-style: normal;
    font-weight: 100;
    src: local('MontserratThin'), url(${MontserratThin}) format('truetype');
  }

  @font-face {
    font-family: 'MontserratThinItalic';
    font-style: italic;
    font-weight: 100;
    src: local('MontserratThinItalic'), url(${MontserratThinItalic}) format('truetype');
  }

  @font-face {
    font-family: 'MontserratExtraLight';
    font-style: normal;
    font-weight: 200;
    src: local('MontserratExtraLight'), url(${MontserratExtraLight}) format('truetype');
  }

  @font-face {
    font-family: 'MontserratExtraLightItalic';
    font-style: italic;
    font-weight: 200;
    src: local('MontserratExtraLightItalic'), url(${MontserratExtraLightItalic}) format('truetype');
  }

  @font-face {
    font-family: 'MontserratLight';
    font-style: normal;
    font-weight: 300;
    src: local('MontserratLight'), url(${MontserratLight}) format('truetype');
  }

  @font-face {
    font-family: 'MontserratLightItalic';
    font-style: italic;
    font-weight: 300;
    src: local('MontserratLightItalic'), url(${MontserratLightItalic}) format('truetype');
  }

  @font-face {
    font-family: 'MontserratRegular';
    font-style: normal;
    font-weight: 400;
    src: local('MontserratRegular'), url(${MontserratRegular}) format('truetype');
  }

  @font-face {
    font-family: 'MontserratItalic';
    font-style: italic;
    font-weight: 400;
    src: local('MontserratItalic'), url(${MontserratItalic}) format('truetype');
  }

  @font-face {
    font-family: 'MontserratMedium';
    font-style: normal;
    font-weight: 500;
    src: local('MontserratMedium'), url(${MontserratMedium}) format('truetype');
  }

  @font-face {
    font-family: 'MontserratMediumItalic';
    font-style: italic;
    font-weight: 500;
    src: local('MontserratMediumItalic'), url(${MontserratMediumItalic}) format('truetype');
  }

  @font-face {
    font-family: 'MontserratSemiBold';
    font-style: normal;
    font-weight: 600;
    src: local('MontserratSemiBold'), url(${MontserratSemiBold}) format('truetype');
  }

  @font-face {
    font-family: 'MontserratSemiBoldItalic';
    font-style: italic;
    font-weight: 600;
    src: local('MontserratSemiBoldItalic'), url(${MontserratSemiBoldItalic}) format('truetype');
  }

  @font-face {
    font-family: 'MontserratBold';
    font-style: normal;
    font-weight: 700;
    src: local('MontserratBold'), url(${MontserratBold}) format('truetype');
  }

  @font-face {
    font-family: 'MontserratBoldItalic';
    font-style: italic;
    font-weight: 700;
    src: local('MontserratBoldItalic'), url(${MontserratBoldItalic}) format('truetype');
  }

  @font-face {
    font-family: 'MontserratExtraBold';
    font-style: normal;
    font-weight: 800;
    src: local('MontserratExtraBold'), url(${MontserratExtraBold}) format('truetype');
  }

  @font-face {
    font-family: 'MontserratExtraBoldItalic';
    font-style: italic;
    font-weight: 800;
    src: local('MontserratExtraBoldItalic'), url(${MontserratExtraBoldItalic}) format('truetype');
  }

  @font-face {
    font-family: 'MontserratBlack';
    font-style: normal;
    font-weight: 900;
    src: local('MontserratBlack'), url(${MontserratBlack}) format('truetype');
  }

  @font-face {
    font-family: 'MontserratBlackItalic';
    font-style: italic;
    font-weight: 900;
    src: local('MontserratBlackItalic'), url(${MontserratBlackItalic}) format('truetype');
  }

  @font-face {
    font-family: 'MontagaRegular';
    font-style: normal;
    font-weight: 400;
    src: local('MontagaRegular'), url(${MontagaRegular}) format('truetype');
  }
`;

// TODO import fonts 

// const fontFace = (name, fileName, fontWeight = 'normal', fontStyle = 'normal') => {
//   console.log(`
//     @font-face{
//         font-family: "${name}";
//         src: url("${require(`client/assets/fonts/${fileName}.ttf`)}") format("ttf");
//         font-style: ${fontStyle};
//         font-weight: ${fontWeight};
//     }
//   `);
//   return `
//     @font-face{
//         font-family: "${name}";
//         src: url("${require(`client/assets/fonts/${fileName}.ttf`)}") format("ttf");
//         font-style: ${fontStyle};
//         font-weight: ${fontWeight};
//     }
//   `;
// };

// export const GlobalStyle = createGlobalStyle`
//   ${fontFace('FuturaPTLight', 'FuturaPT-Light')}
//   ${fontFace('FuturaPTBook', 'FuturaPT-Book')}
//   ${fontFace('FuturaPTMedium', 'FuturaPT-Medium')}
//   ${fontFace('FuturaPTBold', 'FuturaPT-Bold')}
//   ${fontFace('ComfortaaRegular', 'Comfortaa-Regular')}
//   ${fontFace('ComfortaaBold', 'Comfortaa-Bold')}
//   ${fontFace('ComfortaaLight', 'Comfortaa-Light')}
//   ${fontFace('TTNormsBoldItalic', 'TTNorms-BoldItalic')}
//   ${fontFace('TTNormsBold', 'TTNorms-Bold')}
//   ${fontFace('TTNormsBlackItalic', 'TTNorms-BlackItalic')}
//   ${fontFace('TTNormsRegular', 'TTNorms-Regular')}
//   ${fontFace('TTNormsMediumItalic', 'TTNorms-MediumItalic')}
//   ${fontFace('TTNormsExtraLight', 'TTNorms-ExtraLight')}
//   ${fontFace('TTNormsThinItalic', 'TTNorms-ThinItalic')}
//   ${fontFace('TTNormsMedium', 'TTNorms-Medium')}
//   ${fontFace('TTNormsLightItalic', 'TTNorms-LightItalic')}
//   ${fontFace('TTNormsHeavyItalic', 'TTNorms-HeavyItalic')}
//   ${fontFace('TTNormsBlack', 'TTNorms-Black')}
//   ${fontFace('TTNormsExtraBoldItalic', 'TTNorms-ExtraBoldItalic')}
//   ${fontFace('TTNormsExtraBold', 'TTNorms-ExtraBold')}
//   ${fontFace('TTNormsExtraLightItalic', 'TTNorms-ExtraLightItalic')}
//   ${fontFace('TTNormsLight', 'TTNorms-Light')}
//   ${fontFace('TTNormsHeavy', 'TTNorms-Heavy')}
//   ${fontFace('TTNormsItalic', 'TTNorms-Italic')}
//   ${fontFace('TTNormsThin', 'TTNorms-Thin')}
