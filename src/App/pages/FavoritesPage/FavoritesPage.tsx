import { observer } from 'mobx-react-lite';
import { useStore } from '@stores/hooks/useStore';
import { useEffect } from 'react';
import RecipeCard from '@pages/shared/RecipeCard';
import styles from './FavoritesPage.module.scss';
import Text from '@components/Text';
import { BaseRecipe } from '@types';
import { Loader } from '@components/Loader';

export const FavoritesPage = observer(() => {
  const { savedRecipesStore, authStore } = useStore();

  useEffect(() => {
    if (authStore.user?.uid) {
      savedRecipesStore.loadSavedRecipes(authStore.user.uid);
    }
  }, [savedRecipesStore, authStore.user?.uid]);

  return (
    <div className={styles.favorites}>
      <Text view="title" tag="h1" weight="bold" className={styles.title}>
        Saved Recipes
      </Text>
      {
        savedRecipesStore.loading ? (
          <div className={styles.loader}>
            <Loader size="m" />
          </div>
        ): (
          <div className={styles.grid}>
            {savedRecipesStore.savedRecipesDetails.map((recipe: BaseRecipe) => (
              <RecipeCard key={recipe.documentId} recipe={recipe} />
            ))}
          </div>
        )
      }
    </div>
  );
});

export default FavoritesPage;
