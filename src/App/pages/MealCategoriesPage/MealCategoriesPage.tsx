import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { IMealCategory } from '@stores/MealCategoriesStore';
import { useStore } from '@stores/hooks';
import Card from '@components/Card';
import styles from './MealCategoriesPage.module.scss';
import { Loader } from '@components/Loader';

const MealCategoriesPage: React.FC = () => {
  const { mealCategoriesStore, recipeStore } = useStore();

  useEffect(() => {
    mealCategoriesStore.fetchCategories();
  }, [mealCategoriesStore]);

  if (mealCategoriesStore.loading) {
    return (
      <div className={styles.loader}>
        <Loader size="m" />
      </div>
    );
  }

  if (mealCategoriesStore.error) {
    return <div className={styles.error}>Error: {mealCategoriesStore.error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Meal Categories</h1>
      <div className={styles.grid}>
        {mealCategoriesStore.categories.map((category: IMealCategory) => (
          <Card
            key={category.id}
            image={category.image.url}
            title={category.title}
            subtitle={mealCategoriesStore.getRecipeNames(category)}
            contentSlot={
              category.recipes.length ? (
                <span className={styles['category-card__recipes']}>
                  Recipes: {category.recipes.length}
                </span>
              ) : (
                <span className={styles['category-card__recipes']}>No recipes in category</span>
              )
            }
            onClick={() => {
              recipeStore.resetFilters();
              recipeStore.setSelectedCategories([category.id]);
              window.location.replace(`#/?page=1&categories=${category.id}`);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const MealCategoriesComponent = observer(MealCategoriesPage);
export default MealCategoriesComponent;
