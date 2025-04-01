import axios from 'axios';
import qs from 'qs';
import { apiEndpoints } from '@configs/api';

export const getRecipes = async () => {
  //NOTE: добавила в populate ingradients (т.к. в макете нужен список ингредиентов)
  const query = qs.stringify({ populate: ['images', 'ingradients'] });
  const url = `${apiEndpoints.recipes}?${query}`;
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
