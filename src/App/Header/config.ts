import { ROUTES } from '@configs/routes';
import { getRecipes } from '@utils/api';

export interface MenuItem {
  link: string;
  title: string;
  isProtected?: boolean;
  isForMobile?: boolean;
  isRandom?: boolean;
}

const getRecipeOfTheDayId = async () => {
  try {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

    const response = await getRecipes({ pageSize: 100 });
    const recipes = response.data;

    if (recipes.length === 0) {
      return null;
    }

    const index = seed % recipes.length;
    return recipes[index].documentId;
  } catch (error) {
    console.error('Error getting recipe of the day:', error);
    return null;
  }
};

export async function getMenuItems(): Promise<MenuItem[]> {
  const recipeOfTheDayId = await getRecipeOfTheDayId();
  const dailyRecipeRoute = recipeOfTheDayId ? `/recipe/${recipeOfTheDayId}` : ROUTES.RECIPE_LIST;

  return [
    {
      link: ROUTES.RECIPE_LIST,
      title: 'Recipes',
    },
    {
      link: '...',
      title: 'Random Recipe',
      isRandom: true,
    },
    {
      link: dailyRecipeRoute,
      title: 'Daily Recipe',
    },
    {
      link: ROUTES.MEAL_CATEGORIES,
      title: 'Meal Categories',
    },
    {
      link: ROUTES.FAVORITES,
      title: 'Favorites',
      isProtected: true,
      isForMobile: true,
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
      isProtected: false,
    },
  ];
}
