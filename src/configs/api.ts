export const BASE_URL = 'https://front-school-strapi.ktsdev.ru/api';

export const apiEndpoints = {
  recipes: `${BASE_URL}/recipes`,
  recipeById: (documentId: string) => `${BASE_URL}/recipes/${documentId}`,
};
