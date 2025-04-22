import axios from 'axios';
import qs from 'qs';
import { apiEndpoints } from '@configs/api';
import { IRange } from '@stores/RecipeStore/interfaces';

interface GetRecipesParams {
  page?: number;
  pageSize?: number;
  query?: string;
  categories?: number[];
  vegetarian?: boolean;
  calories?: IRange;
  totalTime?: IRange;
}

export const getRecipes = async (params: GetRecipesParams = {}) => {
  const {
    page = 1,
    pageSize = 9,
    query = '',
    categories = [],
    vegetarian = false,
    calories,
    totalTime,
  } = params;

  const queryParams = {
    populate: ['images', 'ingradients'],
    pagination: {
      page,
      pageSize,
    },
    filters: {
      ...(query
        ? {
            name: {
              $containsi: query,
            },
          }
        : {}),
      ...(categories.length > 0
        ? {
            category: {
              id: {
                $in: categories,
              },
            },
          }
        : {}),
      ...(vegetarian && {
        vegetarian: {
          $eq: true,
        },
      }),
      ...(calories && {
        calories: {
          ...(calories.min !== undefined && { $gte: calories.min }),
          ...(calories.max !== undefined && { $lte: calories.max }),
        },
      }),
      ...(totalTime && {
        totalTime: {
          ...(totalTime.min !== undefined && { $gte: totalTime.min }),
          ...(totalTime.max !== undefined && { $lte: totalTime.max }),
        },
      }),
    },
  };

  const queryString = qs.stringify(queryParams, {
    encodeValuesOnly: true,
  });

  const url = `${apiEndpoints.recipes}?${queryString}`;
  const response = await axios.get(url);
  return response.data;
};

export const getCategories = async () => {
  const query = qs.stringify({
    populate: '*',
  });
  const url = `${apiEndpoints.categories}?${query}`;
  const response = await axios.get(url);
  return response.data;
};

export const getRecipeById = async (documentId: string) => {
  const query = qs.stringify({
    populate: ['ingradients', 'equipments', 'directions.image', 'images', 'category'],
  });
  const url = `${apiEndpoints.recipeById(documentId)}?${query}`;
  const response = await axios.get(url);
  return response.data;
};
