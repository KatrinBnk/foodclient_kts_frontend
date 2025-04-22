import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@stores/hooks';
import RecipeList from './RecipeList';
import FilterBar from './FilterBar';
import Pagination from './Pagination';
import styles from './RecipeListContent.module.scss';
import Loader from '@components/Loader';

const RecipeListContent: React.FC = () => {
  const { recipeStore } = useStore();

  useEffect(() => {
    recipeStore.fetchRecipes();
  }, [recipeStore]);

  return (
    <div className={styles['recipe-list-content']}>
      <FilterBar />
      
      {recipeStore.loading ? (
        <div className={styles['recipe-list-content__loading']}>
          <Loader size="m" />
        </div>
      ) : (
        <>
          <RecipeList recipes={recipeStore.recipes} />
          
          {recipeStore.error && (
            <div className={styles['recipe-list-content__error']}>
              An error occurred when uploading recipes
            </div>
          )}

          {recipeStore.recipes.length === 0 && (
            <div className={styles['recipe-list-content__empty']}>No recipes found</div>
          )}
        </>
      )}

      {recipeStore.meta && (
        <Pagination
          currentPage={recipeStore.currentPage}
          totalPages={recipeStore.meta.pageCount}
          onPageChange={(page: number) => recipeStore.setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export const RecipeListContentComponent = observer(RecipeListContent);
export default RecipeListContentComponent;
