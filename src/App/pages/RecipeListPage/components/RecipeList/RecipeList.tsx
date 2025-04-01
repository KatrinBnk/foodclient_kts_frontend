import React from 'react';
import { ShortRecipe } from '@/types';
import RecipeCard from '../RecipeCard';
import styles from './RecipeList.module.scss';

interface RecipeListProps {
  recipes: ShortRecipe[];
  onSave: (documentId: string) => void;
  onCardClick: (documentId: string) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onSave, onCardClick }) => {
  return (
    <div className={styles['recipe-list']}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.documentId}
          recipe={recipe}
          onSave={onSave}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default RecipeList;
