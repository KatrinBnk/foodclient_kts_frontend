import { ROUTES } from '@configs/routes';

export interface MenuItem {
  link: string;
  title: string;
  isProtected?: boolean;
  isForMobile?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    link: ROUTES.RECIPE_LIST,
    title: 'Recipes',
  },
  {
    link: ROUTES.RANDOM_RECIPE,
    title: 'Random Recipe',
  },
  {
    link: ROUTES.DAILY_RECIPE,
    title: 'Daily Recipe',
  },
  {
    link: ROUTES.FAVORITES,
    title: 'Favorites',
    isProtected: true,
  },
  {
    link: ROUTES.PROFILE,
    title: 'Profile',
    isProtected: true,
    isForMobile: true,
  },
  {
    link: ROUTES.AUTH,
    title: 'Login',
    isForMobile: true,
  }
];
