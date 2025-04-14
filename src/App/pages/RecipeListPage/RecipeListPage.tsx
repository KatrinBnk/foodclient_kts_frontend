import React from 'react';
import Poster from './components/Poster';
import RecipeListContent from './components/RecipeListContent';

const RecipeListPage: React.FC = () => {
  return (
    <>
      <Poster />
      <RecipeListContent />
    </>
  );
};

export default RecipeListPage;
