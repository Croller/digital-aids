export const BREAKPOINTS = {
  small: 420,
  medium: 768,
  large: 1366,
  xlarge: 1920,
};

export const Z_INDEX = {
  header: 100,
  footerMenu: 100,
  modal: 200,
  loader: 999,
};

export const PALETTE = {
  white: '#FFFFFF',
  black: '#000000',

  grey1: '#969696',
  grey2: '#E4E4E4',
  grey3: '#BDBDBD',
  grey4: '#868686',

  green1: '#219653',

  red1: '#F43658',
};

const fontsCommon = '\'Source Sans Pro\', Helvetica, sans-serif';
export const FONTS = {
  light: `'MontserratLight', ${fontsCommon}`,
  regular: `'MontserratRegular', ${fontsCommon}`,
  medium: `'MontserratMedium', ${fontsCommon}`,
  bold: `'MontserratSemiBold', ${fontsCommon}`,
};

export const THEME = {
  bgColor: PALETTE.white,
  borderRadius: '8px',
  borderRadiusBtn: '6px',
  boxShadow1: '0px 1px 24px rgba(0, 0, 0, 0.1)',
  boxShadowHeader: '0px 4px 34px rgba(0, 0, 0, 0.1)',
  boxShadowMobileFooter: '0px -4px 24px rgba(0, 0, 0, 0.15)',
  boxShadow404: '0 2px 84px rgba(0, 0, 0, 0.1)',
};
