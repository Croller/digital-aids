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

import {
  FONTS,
  PALETTE,
  BREAKPOINTS,
} from './constants';

export const GlobalStyle = createGlobalStyle`
  body {
    height: 100%;
    margin: 0;
    font-family: ${FONTS.regular} !important;
    overflow-x: hidden;
    background-color: ${PALETTE.white}
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

  .ant-dropdown {
    top: 196px !important;

    .ant-table-filter-dropdown {
      border-radius: 6px;

      .ant-space-item {
        button {
          border-radius: 8px;
        }
      }
    }

    @media screen and (min-width: ${BREAKPOINTS.medium}) {
      top: 144px !important;
    }

    @media screen and (min-width: ${BREAKPOINTS.large}) {
      top: 171px !important;
    }
  }

  /* import fronts */

  @font-face {
    font-family: 'MontserratThin';
    src: local('MontserratThin'), url(${MontserratThin}) fomat(truetype);
  }

  @font-face {
    font-family: 'MontserratThinItalic';
    src: local('MontserratThinItalic'), url(${MontserratThinItalic}) fomat(truetype);
  }

  @font-face {
    font-family: 'MontserratExtraLight';
    src: local('MontserratExtraLight'), url(${MontserratExtraLight}) fomat(truetype);
  }

  @font-face {
    font-family: 'MontserratExtraLightItalic';
    src: local('MontserratExtraLightItalic'), url(${MontserratExtraLightItalic}) fomat(truetype);
  }

  @font-face {
    font-family: 'MontserratLight';
    src: local('MontserratLight'), url(${MontserratLight}) fomat(truetype);
  }

  @font-face {
    font-family: 'MontserratLightItalic';
    src: local('MontserratLightItalic'), url(${MontserratLightItalic}) fomat(truetype);
  }

  @font-face {
    font-family: 'MontserratRegular';
    src: local('MontserratRegular'), url(${MontserratRegular}) fomat(truetype);
  }

  @font-face {
    font-family: 'MontserratItalic';
    src: local('MontserratItalic'), url(${MontserratItalic}) fomat(truetype);
  }

  @font-face {
    font-family: 'MontserratMedium';
    src: local('MontserratMedium'), url(${MontserratMedium}) fomat(truetype);
  }

  @font-face {
    font-family: 'MontserratMediumItalic';
    src: local('MontserratMediumItalic'), url(${MontserratMediumItalic}) fomat(truetype);
  }

  @font-face {
    font-family: 'MontserratSemiBold';
    src: local('MontserratSemiBold'), url(${MontserratSemiBold}) fomat(truetype);
  }

  @font-face {
    font-family: 'MontserratSemiBoldItalic';
    src: local('MontserratSemiBoldItalic'), url(${MontserratSemiBoldItalic}) fomat(truetype);
  }

  @font-face {
    font-family: 'MontserratBold';
    src: local('MontserratBold'), url(${MontserratBold}) fomat(truetype);
  }

  @font-face {
    font-family: 'MontserratBoldItalic';
    src: local('MontserratBoldItalic'), url(${MontserratBoldItalic}) fomat(truetype);
  }

  @font-face {
    font-family: 'MontserratExtraBold';
    src: local('MontserratExtraBold'), url(${MontserratExtraBold}) fomat(truetype);
  }

  @font-face {
    font-family: 'MontserratExtraBoldItalic';
    src: local('MontserratExtraBoldItalic'), url(${MontserratExtraBoldItalic}) fomat(truetype);
  }

  @font-face {
    font-family: 'MontserratBlack';
    src: local('MontserratBlack'), url(${MontserratBlack}) fomat(truetype);
  }

  @font-face {
    font-family: 'MontserratBlackItalic';
    src: local('MontserratBlackItalic'), url(${MontserratBlackItalic}) fomat(truetype);
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
