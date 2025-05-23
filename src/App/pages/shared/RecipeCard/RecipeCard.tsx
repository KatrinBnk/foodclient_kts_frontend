import { ShortRecipe } from '@types';
import Card from '@components/Card';
import Button from '@components/Button';
import styles from './RecipeCard.module.scss';
import ClockIcon from '@components/Icons/ClockIcon';
import VegetarianIcon from '@components/Icons/VegetarianIcon';
import { observer } from 'mobx-react-lite';
import { useStore } from '@stores/hooks/useStore.ts';
import { useNavigate } from 'react-router-dom';
import ToastNotification from '@components/ToastNotification';
import { useState } from 'react';

interface RecipeCardProps {
  recipe: ShortRecipe;
}

export const RecipeCard = observer(({ recipe }: RecipeCardProps) => {
  const { savedRecipesStore, authStore } = useStore();
  const navigate = useNavigate();
  const isSaved = savedRecipesStore.isRecipeSaved(recipe.documentId);
  const isAuthenticated = authStore.isAuthenticated;
  const userId = authStore.user?.uid;
  const [showAuthToast, setShowAuthToast] = useState(false);

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      setShowAuthToast(true);
      return;
    }

    if (!userId) return;

    if (isSaved) {
      await savedRecipesStore.removeRecipe(recipe.documentId, userId);
    } else {
      await savedRecipesStore.saveRecipe(recipe.documentId, userId);
    }
  };

  const handleCardClick = (documentId: string) => {
    navigate(`/recipe/${documentId}`);
  };

  const ingredients = recipe.ingradients
    ? recipe.ingradients.map((item) => item.name).join(' + ')
    : 'Ingredients not specified';

  return (
    <>
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
          <span className={styles['recipe-card__calories']}>
            {Math.round(recipe.calories)} kcal
          </span>
        }
        actionSlot={
          <Button onClick={handleSave} className={styles.saveButton}>
            {isSaved ? 'Resave' : 'Save'}
          </Button>
        }
        imageSlot={
          recipe.vegetarian && (
            <div className={styles['recipe-card__vegetarian']} title="Vegetarian dish">
              <VegetarianIcon
                className={styles['recipe-card__vegetarian-icon']}
                width={35}
                height={35}
                color="green"
              />
            </div>
          )
        }
        onClick={() => handleCardClick(recipe.documentId)}
      />
      {showAuthToast && (
        <ToastNotification
          message="To save the recipe, you need to sign in."
          type="error"
          duration={3000}
          onClose={() => setShowAuthToast(false)}
        />
      )}
    </>
  );
});

export default RecipeCard;
