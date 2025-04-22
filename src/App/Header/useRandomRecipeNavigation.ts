import { useNavigate } from 'react-router-dom';
import { useStore } from '@stores/hooks';
import { useState } from 'react';

export const useRandomRecipeNavigation = () => {
  const navigate = useNavigate();
  const { recipeStore } = useStore();
  const [showNoRecipesToast, setShowNoRecipesToast] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const recipes = recipeStore.recipes;
    if (recipes.length > 0) {
      const randomIndex = Math.floor(Math.random() * recipes.length);
      navigate(`/recipe/${recipes[randomIndex].documentId}`);
    } else {
      setShowNoRecipesToast(true);
    }
  };

  return { handleClick, showNoRecipesToast, setShowNoRecipesToast };
};
