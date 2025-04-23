import { BaseRecipe, Image } from '@types';

export interface IMealCategory {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: Image;
  recipes: BaseRecipe[];
}