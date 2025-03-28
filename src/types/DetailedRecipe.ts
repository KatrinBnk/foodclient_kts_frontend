import { BaseRecipe } from './BaseRecipe';

export interface DetailedRecipe extends BaseRecipe {
  summary: string;
  totalTime: number;
  cookingTime: number;
  preparationTime: number;
  servings: number;
  rating: number;
  likes: number;
  vegetarian: boolean;
  equipments: Equipment[];
  directions: Direction[];
}

export interface Equipment {
  id: number;
  name: string;
}

export interface Direction {
  id: number;
  description: string;
  image: string | null;
}
