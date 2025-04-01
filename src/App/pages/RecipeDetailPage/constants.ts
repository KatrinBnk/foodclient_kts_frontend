import { DetailedRecipe } from '@/types';

export interface FoodInfo {
  label: string;
  data: string;
  gridColumn: number;
  gridRow: number;
}

export const getFoodInfo = (recipe: DetailedRecipe): FoodInfo[] => [
  {
    label: 'Preparation',
    data: recipe.preparationTime + ' minutes',
    gridColumn: 1,
    gridRow: 1,
  },
  {
    label: 'Cooking',
    data: recipe.cookingTime + ' minutes',
    gridColumn: 2,
    gridRow: 1,
  },
  {
    label: 'Total',
    data: recipe.totalTime + ' minutes',
    gridColumn: 3,
    gridRow: 1,
  },
  {
    label: 'Likes',
    data: recipe.likes.toString(),
    gridColumn: 1,
    gridRow: 2,
  },
  {
    label: 'Servings',
    data: recipe.servings + ' servings',
    gridColumn: 2,
    gridRow: 2,
  },
  {
    label: 'Rating',
    data: recipe.rating + '/5',
    gridColumn: 3,
    gridRow: 2,
  },
]; 