import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeListPage from './pages/RecipeListPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import { ROUTES } from '@configs/routes';
import MainLayout from '@components/Layouts/MainLayout';
import { StoreProvider } from '@/stores/context';

// TODO: скорее всего поменять BrouserRouter на HashRouter (если нужно будет деплоить на gh-pages) и разнести нормально

const App = () => {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.RECIPE_LIST} element={<RecipeListPage />} />
            <Route path={ROUTES.RECIPE_DETAIL} element={<RecipeDetailPage />} />
          </Route>
        </Routes>
      </Router>
    </StoreProvider>
  );
};

export default App;
