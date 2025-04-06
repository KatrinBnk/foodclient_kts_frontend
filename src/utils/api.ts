import axios from 'axios';
import qs from 'qs';
import { apiEndpoints } from '@configs/api';

interface GetRecipesParams {
  page?: number;
  pageSize?: number;
  query?: string;
  categories?: number[];
}

export const getRecipes = async (params: GetRecipesParams = {}) => {
  const { page = 1, pageSize = 9, query = '', categories = [] } = params;

  const queryParams = {
    populate: ['images'],
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
