import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styles from './RecipeDetailPage.module.scss';
import HeaderDetail from './components/HeaderDetail';
import FoodInfo from './components/FoodInfo';
import Summary from './components/Summary';
import Directions from './components/Directions';
import NeededProducts from './components/NeededProducts';
import { getFoodInfo } from './configs/constants';
import { useStore } from '@stores/hooks';
import { Loader } from '@components/Loader';

const RecipeDetailPage: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const { recipeDetailsStore } = useStore();

  const fetchRecipe = useCallback(
    (id: string) => {
      recipeDetailsStore.fetchRecipeById(id);
    },
    [recipeDetailsStore]
  );

  useEffect(() => {
    if (documentId) {
      fetchRecipe(documentId);
    }
  }, [documentId, fetchRecipe]);

  if (recipeDetailsStore.loading || (!recipeDetailsStore.recipe && !recipeDetailsStore.error)) {
    return (
      <div className={styles['recipe-detail-page__container']}>
        <Loader size="m" />
      </div>
    );
  }

  if (recipeDetailsStore.error) {
    return <div className={styles['recipe-detail-page__container']}>{'Recipe upload error'}</div>;
  }

  const recipe = recipeDetailsStore.recipe!;
  const foodInfo = getFoodInfo(recipe);

  return (
    <main className={styles['recipe-detail-page']}>
      <HeaderDetail title={recipe.name} />
      <div className={styles['recipe-detail-page__main']}>
        <FoodInfo imageUrl={recipe.images[0].url} imageAlt={recipe.name} info={foodInfo} />
        <Summary text={recipe.summary} />
        <NeededProducts
          ingredients={recipeDetailsStore.recalculatedIngredients}
          equipment={recipe.equipments}
        />
        <Directions directions={recipe.directions} />
      </div>
    </main>
  );
};

export const RecipeDetailPageComponent = observer(RecipeDetailPage);
export default RecipeDetailPageComponent;
