// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  forgot: path(ROOTS_AUTH, '/forgot-pass'),
};

// ----------------------------------------------------------------------

export const PATH_PAGE = {
  home: '/',
  aboutUs: '/about-us',
  availableCities: '/available-cities',
  searchChef: {
    root: '/cities',
    cities: ({cityId, cuisineId, chefId} = '') =>
      path(
        '/cities',
        `${cityId ? '/' + cityId : ''}${cuisineId ? '/' + cuisineId : ''}${
          chefId ? '/' + chefId : ''
        }`,
      ),
  },
  contactUs: '/contact-us',
  ingredients: '/ingredients',
  cart: '/cart',
  orderConfirm: {
    root: '/orders',
    orders: ({orderId} = '') => path('/orders', `${'/' + orderId}`),
  },
};

export const PATH_DASHBOARD = {
  root: path(ROOTS_DASHBOARD, ''),
  account: path(ROOTS_DASHBOARD, '/account'),
  payments: path(ROOTS_DASHBOARD, '/payments'),
  orders: path(ROOTS_DASHBOARD, '/orders'),
  wishlist: path(ROOTS_DASHBOARD, '/wishlist'),
};
