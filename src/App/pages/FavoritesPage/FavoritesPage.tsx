import { observer } from 'mobx-react-lite';
import { useStore } from '@stores/hooks/useStore';
import { useEffect } from 'react';
import RecipeCard from '@pages/RecipeListPage/components/RecipeCard/RecipeCard';
import styles from './FavoritesPage.module.scss';
import Text from '@components/Text';
import { useNavigate } from 'react-router-dom';
import { BaseRecipe } from '@/types';

// NOTE: использовать RecipeCard из RecipeList не окей, нужно будет поменять

export const FavoritesPage = observer(() => {
  const navigate = useNavigate();
  const { savedRecipesStore } = useStore();

  useEffect(() => {
    savedRecipesStore.loadSavedRecipes();
  }, [savedRecipesStore]);

  const handleSave = (documentId: string) => {
    savedRecipesStore.removeRecipe(documentId);
  };

  const handleCardClick = (documentId: string) => {
    navigate(`/recipe/${documentId}`);
  };

  return (
    <div className={styles.favorites}>
      <Text view="title" tag="h1" weight="bold" className={styles.title}>
        Saved Recipes
      </Text>
      <div className={styles.grid}>
        {savedRecipesStore.savedRecipesDetails.map((recipe: BaseRecipe) => (
          <RecipeCard
            key={recipe.documentId}
            recipe={recipe}
            onSave={handleSave}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
});

export default FavoritesPage;
