import { ROUTES } from '@configs/routes';

export interface MenuItem {
  link: string;
  title: string;
}

//NOTE: надо будет заменить на использование маршрутов из конфига
export const menuItems: MenuItem[] = [
  {
    link: ROUTES.RECIPE_LIST,
    title: 'Recipes',
  },
  {
    link: '/categories',
    title: 'Meals Categories',
  },
  {
    link: '/products',
    title: 'Products',
  },
  {
    link: '/menu_item',
    title: 'Menu Items',
  },
  {
    link: '/planning',
    title: 'Meal Planning',
  },
]; 