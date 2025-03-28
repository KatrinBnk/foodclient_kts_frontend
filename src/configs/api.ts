export const BASE_URL = 'https://front-school-strapi.ktsdev.ru/api';
export const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN as string;

export const apiEndpoints = {
  recipes: `${BASE_URL}/recipes`,
  recipeById: (documentId: string) => `${BASE_URL}/recipes/${documentId}`,
};
