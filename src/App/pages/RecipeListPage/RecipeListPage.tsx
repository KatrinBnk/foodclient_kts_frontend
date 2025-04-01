import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecipes } from '@utils/api';
import styles from './RecipeListPage.module.scss';
import RecipeList from './components/RecipeList';
import { ApiResponse, ShortRecipe } from '@/types';
import Poster from '/assets/poster.png';

const RecipeListPage: React.FC = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<ShortRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (isMounted.current) return;
      isMounted.current = true;

      try {
        const response: ApiResponse<ShortRecipe[]> = await getRecipes();
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

  if (loading) return <div className={styles['recipe-list-page__container']}>Загрузка...</div>;
  if (error) return <div className={styles['recipe-list-page__container']}>{error}</div>;

  return (
    <>
      <div className={styles['recipe-list-page__poster']}>
        <img src={Poster} alt="Recipes banner" />
        <div className={styles['recipe-list-page__poster-overlay']}>
          Find the perfect food and <a>drink ideas</a> for every occasion, from{' '}
          <a>weeknight dinners</a> to <a>holiday feasts</a>.
        </div>
      </div>
      <div className={styles['recipe-list-page__container']}>
        <RecipeList
          recipes={recipes}
          onSave={handleSave}
          onCardClick={handleCardClick}
        />
      </div>
    </>
  );
};

export default RecipeListPage;