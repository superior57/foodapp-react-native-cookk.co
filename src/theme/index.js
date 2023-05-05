// ----------------------------------------------------------------------

function createGradient(color1, color2, direction = '92.97deg') {
  return `linear-gradient(${direction}, ${color1}, ${color2})`;
}

// SETUP COLORS
export const PRIMARY = {
  lighter: '#f7db94',
  light: '#F5D37A',
  main: '#CFAA4C',
  dark: '#907635',
  darker: '#645225',
};
export const SECONDARY = {
  lighter: '#446455',
  light: '#163E2B',
  main: '#0B2619',
  dark: '#071a11',
  darker: '#04120b',
};
export const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
};
export const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
};
export const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
};
export const ERROR = {
  lighter: '#ff8888',
  light: '#ff6b6b',
  main: '#FF4646',
  dark: '#b23131',
  darker: '#7c2222',
};

export const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#D9D9D9',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#909090',
  700: '#454F5B',
  800: '#31342B',
  900: '#161C24',
};

export const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  secondary: createGradient(SECONDARY.light, SECONDARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

export const CHART_COLORS = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
};
