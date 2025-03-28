import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecipes } from '@utils/api';
import styles from './RecipeListPage.module.scss';
import RecipeList from '@components/RecipeList/RecipeList';
import { ApiResponse, Recipe } from '@/types';
import Poster from '/assets/poster.png';

const RecipeListPage: React.FC = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response: ApiResponse<Recipe[]> = await getRecipes();
        setRecipes(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError('Ошибка при загрузке рецептов');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  //TODO: Реализовать сохранение рецепта
  const handleSave = (documentId: string) => {
    console.log(`Сохранен рецепт с documentId: ${documentId}`);
  };

  const handleCardClick = (documentId: string) => {
    navigate(`/recipe/${documentId}`);
  };

  if (loading) return <div className={styles.container}>Загрузка...</div>;
  if (error) return <div className={styles.container}>{error}</div>;

  return (
    <>
      <div className={styles.poster}>
        <img src={Poster} alt="Recipes banner" />
        <div className={styles.poster__overlay}>
          Find the perfect food and <a>drink ideas</a> for every occasion, from{' '}
          <a>weeknight dinners</a> to <a>holiday feasts</a>.
        </div>
      </div>
      <div className={styles.container}>
        <RecipeList recipes={recipes} onSave={handleSave} onCardClick={handleCardClick} />
      </div>
    </>
  );
};

export default RecipeListPage;
