import { ROUTES } from '@configs/routes';

export interface MenuItem {
  link: string;
  title: string;
}

export const menuItems: MenuItem[] = [
  {
    link: ROUTES.RECIPE_LIST,
    title: 'Recipes',
  },
  {
    link: ROUTES.MEAL_CATEGORIES,
    title: 'Meals Categories',
  },
  {
    link: ROUTES.PRODUCTS,
    title: 'Products',
  },
  {
    link: ROUTES.MENU_ITEMS,
    title: 'Menu Items',
  },
  {
    link: ROUTES.MEAL_PLANNING,
    title: 'Meal Planning',
  },
];
