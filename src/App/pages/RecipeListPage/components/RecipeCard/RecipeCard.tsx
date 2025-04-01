import React from 'react';
import { ShortRecipe } from '@/types';
import Card from '@components/Card';
import Button from '@components/Button';
import styles from './RecipeCard.module.scss';
import ClockIcon from '@components/Icons/ClockIcon';

interface RecipeCardProps {
  recipe: ShortRecipe;
  onSave: (documentId: string) => void;
  onCardClick: (documentId: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSave, onCardClick }) => {
  const ingredients = recipe.ingradients
    ? recipe.ingradients.map((item) => item.name).join(' + ')
    : 'Ingredients not specified';

  return (
    <Card
      className={styles['recipe-card']}
      image={recipe.images && recipe.images.length > 0 ? recipe.images[0].url : ''}
      captionSlot={
        recipe.totalTime && (
          <span className={styles['recipe-card__time']}>
            <span className={styles['recipe-card__time-icon']}>
              <ClockIcon width={14} height={14} color="brand" />
            </span>
            <span className={styles['recipe-card__time-text']}>{recipe.totalTime} minutes</span>
          </span>
        )
      }
      title={recipe.name}
      subtitle={ingredients}
      contentSlot={
        <span className={styles['recipe-card__calories']}>{Math.round(recipe.calories)} kcal</span>
      }
      actionSlot={
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onSave(recipe.documentId);
          }}
        >
          Save
        </Button>
      }
      onClick={() => onCardClick(recipe.documentId)}
    />
  );
};

export default RecipeCard;
