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
};

const fontsCommon = '\'Source Sans Pro\', Helvetica, sans-serif';
export const FONTS = {
  light: `MontserratRegular, ${fontsCommon}`,
  regular: `MontserratRegular, ${fontsCommon}`,
  medium: `MontserratMedium, ${fontsCommon}`,
  bold: `MontserratSemiBold, ${fontsCommon}`,
};

export const THEME = {
  bgColor: PALETTE.white,
  // containerBoxShadow: `0 1px 10px 0 ${PALETTE.grey4}`,
};
