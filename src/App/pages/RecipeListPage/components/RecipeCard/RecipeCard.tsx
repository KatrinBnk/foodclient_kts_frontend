import { ShortRecipe } from '@/types';
import Card from '@components/Card';
import Button from '@components/Button';
import styles from './RecipeCard.module.scss';
import ClockIcon from '@components/Icons/ClockIcon';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/hooks/useStore';

interface RecipeCardProps {
  recipe: ShortRecipe;
  onSave: (documentId: string) => void;
  onCardClick: (documentId: string) => void;
}

export const RecipeCard = observer(({ recipe, onSave, onCardClick }: RecipeCardProps) => {
  const { recipeListPageStore } = useStore();
  const isSaved = recipeListPageStore.savedRecipesStore.isRecipeSaved(recipe.documentId);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      recipeListPageStore.savedRecipesStore.removeRecipe(recipe.documentId);
    } else {
      recipeListPageStore.savedRecipesStore.saveRecipe(recipe.documentId);
    }
    onSave(recipe.documentId);
  };

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
          onClick={handleSave}
          className={styles.saveButton}
        >
          {isSaved ? 'Resave' : 'Save'}
        </Button>
      }
      onClick={() => onCardClick(recipe.documentId)}
    />
  );
});

export default RecipeCard;
