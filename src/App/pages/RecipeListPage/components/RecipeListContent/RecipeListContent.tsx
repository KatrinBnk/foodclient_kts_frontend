import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRecipeListPage } from '@/stores/hooks';
import RecipeList from '../RecipeList';
import FilterBar from '../FilterBar';
import Pagination from '../Pagination';
import styles from './RecipeListContent.module.scss';
import { Loader } from '@components/Loader';

const RecipeListContent: React.FC = () => {
  const navigate = useNavigate();
  const { recipeStore } = useRecipeListPage();

  useEffect(() => {
    recipeStore.fetchRecipes();
  }, [recipeStore]);

  const handleSave = (documentId: string) => {
    console.log(`Сохранен рецепт с documentId: ${documentId}`);
  };

  const handleCardClick = (documentId: string) => {
    navigate(`/recipe/${documentId}`);
  };

  return (
    <div className={styles['recipe-list-content']}>
      <FilterBar />
      <RecipeList
        recipes={recipeStore.filteredRecipes}
        onSave={handleSave}
        onCardClick={handleCardClick}
      />

      {recipeStore.loading && (
        <div className={styles['recipe-list-content__loading']}>
          <Loader size="m" />
        </div>
      )}

      {recipeStore.error && (
        <div className={styles['recipe-list-content__error']}>
          Произошла ошибка при загрузке рецептов
        </div>
      )}

      {recipeStore.filteredRecipes.length === 0 && (
        <div className={styles['recipe-list-content__empty']}>No recipes found</div>
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
