import React from 'react';
import { ShortRecipe } from '@types';
import RecipeCard from '@pages/shared/RecipeCard';
import styles from './RecipeList.module.scss';

interface RecipeListProps {
  recipes: ShortRecipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes: recipes }) => {
  return (
    <div className={styles['recipe-list']}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.documentId} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
