import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '@utils/api';
import { ApiResponse, DetailedRecipe } from '@/types';
import styles from './RecipeDetailPage.module.scss';
import HeaderDetail from './components/HeaderDetail';
import FoodInfo from './components/FoodInfo';
import Summary from './components/Summary';
import Directions from './components/Directions';
import NeededProducts from './components/NeededProducts';

interface FoodInfo {
  label: string;
  data: string;
  gridColumn: number;
  gridRow: number;
}

const RecipeDetailPage: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const [recipe, setRecipe] = useState<DetailedRecipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!documentId) {
        setError('Рецепт не найден');
        setLoading(false);
        return;
      }

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

  if (loading) return <div className={styles.container}>Загрузка...</div>;
  if (error || !recipe)
    return <div className={styles.container}>{error || 'Рецепт не найден'}</div>;

  const foodInfo: FoodInfo[] = [
    {
      label: 'Preparation',
      data: recipe.preparationTime + ' minutes',
      gridColumn: 1,
      gridRow: 1,
    },
    {
      label: 'Cooking',
      data: recipe.cookingTime + ' minutes',
      gridColumn: 2,
      gridRow: 1,
    },
    {
      label: 'Total',
      data: recipe.totalTime + ' minutes',
      gridColumn: 3,
      gridRow: 1,
    },
    {
      label: 'Likes',
      data: recipe.likes.toString(),
      gridColumn: 1,
      gridRow: 2,
    },
    {
      label: 'Servings',
      data: recipe.servings + ' servings',
      gridColumn: 2,
      gridRow: 2,
    },
    {
      label: 'Rating',
      data: recipe.rating + '/5',
      gridColumn: 3,
      gridRow: 2,
    },
  ];

  return (
    <main className={styles.RecipeDetailPage}>
      <HeaderDetail title={recipe.name} />
      <div className={styles.RecipeDetailPage__main}>
        <FoodInfo imageUrl={recipe.images[0].url} imageAlt={recipe.name} info={foodInfo} />
        <Summary text={recipe.summary} />
        <NeededProducts ingredients={recipe.ingradients} equipment={recipe.equipments} />
        <Directions directions={recipe.directions} />
      </div>
    </main>
  );
};

export default RecipeDetailPage;
