import { createGlobalStyle } from 'styled-components';
import FuturaPTLight from 'client/assets/fonts/FuturaPT-Light.ttf';
import FuturaPTBook from 'client/assets/fonts/FuturaPT-Book.ttf';
import FuturaPTMedium from 'client/assets/fonts/FuturaPT-Medium.ttf';
import FuturaPTBold from 'client/assets/fonts/FuturaPT-Bold.ttf';
import ComfortaaRegular from 'client/assets/fonts/Comfortaa-Regular.ttf';
import ComfortaaBold from 'client/assets/fonts/Comfortaa-Bold.ttf';
import ComfortaaLight from 'client/assets/fonts/Comfortaa-Light.ttf';
import TTNormsBoldItalic from 'client/assets/fonts/TTNorms-BoldItalic.ttf';
import TTNormsBold from 'client/assets/fonts/TTNorms-Bold.ttf';
import TTNormsBlackItalic from 'client/assets/fonts/TTNorms-BlackItalic.ttf';
import TTNormsRegular from 'client/assets/fonts/TTNorms-Regular.ttf';
import TTNormsMediumItalic from 'client/assets/fonts/TTNorms-MediumItalic.ttf';
import TTNormsExtraLight from 'client/assets/fonts/TTNorms-ExtraLight.ttf';
import TTNormsThinItalic from 'client/assets/fonts/TTNorms-ThinItalic.ttf';
import TTNormsMedium from 'client/assets/fonts/TTNorms-Medium.ttf';
import TTNormsLightItalic from 'client/assets/fonts/TTNorms-LightItalic.ttf';
import TTNormsHeavyItalic from 'client/assets/fonts/TTNorms-HeavyItalic.ttf';
import TTNormsBlack from 'client/assets/fonts/TTNorms-Black.ttf';
import TTNormsExtraBoldItalic from 'client/assets/fonts/TTNorms-ExtraBoldItalic.ttf';
import TTNormsExtraBold from 'client/assets/fonts/TTNorms-ExtraBold.ttf';
import TTNormsExtraLightItalic from 'client/assets/fonts/TTNorms-ExtraLightItalic.ttf';
import TTNormsLight from 'client/assets/fonts/TTNorms-Light.ttf';
import TTNormsHeavy from 'client/assets/fonts/TTNorms-Heavy.ttf';
import TTNormsItalic from 'client/assets/fonts/TTNorms-Italic.ttf';
import TTNormsThin from 'client/assets/fonts/TTNorms-Thin.ttf';
import MontserratLight from 'client/assets/fonts/Montserrat-Light.ttf';
import MontserratMedium from 'client/assets/fonts/Montserrat-Medium.ttf';
import MontserratBold from 'client/assets/fonts/Montserrat-Bold.ttf';
import MontserratRegular from 'client/assets/fonts/Montserrat-Regular.ttf';
import { FONTS, PALETTE, BREAKPOINTS } from './constants';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'FuturaPT-Light';
    src: local('FuturaPT-Light'), url(${FuturaPTLight}) format('truetype');
  }

  @font-face {
    font-family: 'FuturaPT-Book';
    src: local('FuturaPT-Book'), url(${FuturaPTBook}) format('truetype');
  }

  @font-face {
    font-family: 'FuturaPT-Medium';
    src: local('FuturaPT-Medium'), url(${FuturaPTMedium}) format('truetype');
  }

  @font-face {
    font-family: 'FuturaPT-Bold';
    src: local('FuturaPT-Bold'), url(${FuturaPTBold}) format('truetype');
  }

  @font-face {
    font-family: 'Comfortaa-Regular';
    src: local('Comfortaa-Regular'), url(${ComfortaaRegular}) format('truetype');
  }

  @font-face {
    font-family: 'Comfortaa-Bold';
    src: local('Comfortaa-Bold'), url(${ComfortaaBold}) format('truetype');
  }

  @font-face {
    font-family: 'Comfortaa-Light';
    src: local('Comfortaa-Light'), url(${ComfortaaLight}) format('truetype');
  }

  @font-face {
    font-family: 'TTNorms-BoldItalic';
    src: local('TTNorms-BoldItalic'), url(${TTNormsBoldItalic}) format('truetype');
  }

  @font-face {
    font-family: 'TTNorms-Bold';
    font-style: normal;
    font-weight: bold;
    src: local('TTNorms-Bold'), url(${TTNormsBold}) format('truetype');
  }

  @font-face {
    font-family: 'TTNorms-BlackItalic';
    src: local('TTNorms-BlackItalic'), url(${TTNormsBlackItalic}) format('truetype');
  }

  @font-face {
    font-family: 'TTNorms-Regular';
    font-style: normal;
    font-weight: normal;
    src: local('TTNorms-Regular'), url(${TTNormsRegular}) format('truetype');
  }

  @font-face {
    font-family: 'TTNorms-MediumItalic';
    src: local('TTNorms-MediumItalic'), url(${TTNormsMediumItalic}) format('truetype');
  }

  @font-face {
    font-family: 'TTNorms-ExtraLight';
    src: local('TTNorms-ExtraLight'), url(${TTNormsExtraLight}) format('truetype');
  }

  @font-face {
    font-family: 'TTNorms-ThinItalic';
    src: local('TTNorms-ThinItalic'), url(${TTNormsThinItalic}) format('truetype');
  }

  @font-face {
    font-family: 'TTNorms-Medium';
    font-style: normal;
    font-weight: 500;
    src: local('TTNorms-Medium'), url(${TTNormsMedium}) format('truetype');
  }

  @font-face {
    font-family: 'TTNorms-LightItalic';
    src: local('TTNorms-LightItalic'), url(${TTNormsLightItalic}) format('truetype');
  }

  @font-face {
    font-family: 'TTNorms-HeavyItalic';
    src: local('TTNorms-HeavyItalic'), url(${TTNormsHeavyItalic}) format('truetype');
  }

  @font-face {
    font-family: 'TTNorms-Black';
    src: local('TTNorms-Black'), url(${TTNormsBlack}) format('truetype');
  }

  @font-face {
    font-family: 'TTNorms-ExtraBoldItalic';
    src: local('TTNorms-ExtraBoldItalic'), url(${TTNormsExtraBoldItalic}) format('truetype');
  }

  @font-face {
    font-family: 'TTNorms-ExtraBold';
    src: local('TTNorms-ExtraBold'), url(${TTNormsExtraBold}) format('truetype');
  }

  @font-face {
    font-family: 'TTNorms-ExtraLightItalic';
    src: local('TTNorms-ExtraLightItalic'), url(${TTNormsExtraLightItalic}) format('truetype');
  }

  @font-face {
    font-family: 'TTNorms-Light';
    font-style: normal;
    font-weight: 300;
    src: local('TTNorms-Light'), url(${TTNormsLight}) format('truetype');
  }

  @font-face {
    font-family: 'TTNorms-Heavy';
    src: local('TTNorms-Heavy'), url(${TTNormsHeavy}) format('truetype');
  }

  @font-face {
    font-family: 'TTNorms-Italic';
    src: local('TTNorms-Italic'), url(${TTNormsItalic}) format('truetype');
  }

  @font-face {
    font-family: 'TTNorms-Thin';
    src: local('TTNorms-Thin'), url(${TTNormsThin}) format('truetype');
  }

  @font-face {
    font-family: 'Montserrat-Light';
    src: local('Montserrat-Light'), url(${MontserratLight}) format('truetype');
  }

  @font-face {
    font-family: 'Montserrat-Medium';
    src: local('Montserrat-Medium'), url(${MontserratMedium}) format('truetype');
  }

  @font-face {
    font-family: 'Montserrat-Bold';
    src: local('Montserrat-Bold'), url(${MontserratBold}) format('truetype');
  }

  @font-face {
    font-family: 'Montserrat-Regular';
    src: local('Montserrat-Regular'), url(${MontserratRegular}) format('truetype');
  }

  body {
    height: 100%;
    margin: 0;
    font-family: ${FONTS.regular} !important;
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
