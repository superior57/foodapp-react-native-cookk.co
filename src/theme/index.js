// ----------------------------------------------------------------------

function createGradient(color1, color2, direction = '92.97deg') {
  return `linear-gradient(${direction}, ${color1}, ${color2})`;
}

// SETUP COLORS
const PRIMARY = {
  lighter: '#f7db94',
  light: '#F5D37A',
  main: '#CFAA4C',
  dark: '#907635',
  darker: '#645225',
};
const SECONDARY = {
  lighter: '#446455',
  light: '#163E2B',
  main: '#0B2619',
  dark: '#071a11',
  darker: '#04120b',
};
const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
};
const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
};
const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
};
const ERROR = {
  lighter: '#ff8888',
  light: '#ff6b6b',
  main: '#FF4646',
  dark: '#b23131',
  darker: '#7c2222',
};

const GREY = {
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

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  secondary: createGradient(SECONDARY.light, SECONDARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const CHART_COLORS = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
};

const COMMON = {
  common: {black: '#000', white: '#fff'},
  primary: {...PRIMARY, contrastText: '#fff'},
  secondary: {...SECONDARY, contrastText: '#fff'},
  info: {...INFO, contrastText: '#fff'},
  success: {...SUCCESS, contrastText: GREY[800]},
  warning: {...WARNING, contrastText: GREY[800]},
  error: {...ERROR, contrastText: '#fff'},
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

const palette = {
  light: {
    ...COMMON,
    mode: 'light',
    text: {primary: GREY[800], secondary: GREY[600], disabled: GREY[500]},
    background: {
      paper: '#fff',
      default: '#F9F9F9',
      neutral: GREY[200],
      hero: createGradient('#163E2B', '#0B2619', '106.35deg'),
    },
    action: {active: GREY[600], ...COMMON.action},
  },
  dark: {
    ...COMMON,
    mode: 'dark',
    text: {primary: '#fff', secondary: GREY[500_75], disabled: GREY[600]},
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: GREY[500_16],
      hero: createGradient('#163E2B', '#0B2619', '106.35deg'),
    },
    action: {active: GREY[500], ...COMMON.action},
  },
};

export default palette;
