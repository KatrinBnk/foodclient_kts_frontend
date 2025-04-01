import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '@utils/api';
import { ApiResponse, DetailedRecipe } from '@/types';
import styles from './RecipeDetailPage.module.scss';
import HeaderDetail from './components/HeaderDetail';
import FoodInfo from './components/FoodInfo';
import Summary from './components/Summary';
import Directions from './components/Directions';
import NeededProducts from './components/NeededProducts';
import { getFoodInfo } from '@/App/pages/RecipeDetailPage/configs/constants.ts';

const RecipeDetailPage: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const [recipe, setRecipe] = useState<DetailedRecipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!documentId) {
        setError('Рецепт не найден');
        setLoading(false);
        return;
      }

      if (isMounted.current) return;
      isMounted.current = true;

      try {
        const response: ApiResponse<DetailedRecipe> = await getRecipeById(documentId);
        setRecipe(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError('Ошибка при загрузке рецепта');
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [documentId]);

  if (loading) return <div className={styles['recipe-detail-page__container']}>Загрузка...</div>;
  if (error || !recipe)
    return (
      <div className={styles['recipe-detail-page__container']}>{error || 'Рецепт не найден'}</div>
    );

  const foodInfo = getFoodInfo(recipe);

  return (
    <main className={styles['recipe-detail-page']}>
      <HeaderDetail title={recipe.name} />
      <div className={styles['recipe-detail-page__main']}>
        <FoodInfo imageUrl={recipe.images[0].url} imageAlt={recipe.name} info={foodInfo} />
        <Summary text={recipe.summary} />
        <NeededProducts ingredients={recipe.ingradients} equipment={recipe.equipments} />
        <Directions directions={recipe.directions} />
      </div>
    </main>
  );
};

export default RecipeDetailPage;
