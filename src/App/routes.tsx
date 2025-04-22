import { ROUTES } from '@configs/routes';
import RecipeListPage from '@pages/RecipeListPage';
import RecipeDetailPage from '@pages/RecipeDetailPage';
import FavoritesPage from '@pages/FavoritesPage';
import AuthPage from '@pages/AuthPage';
import ProfilePage from '@pages/ProfilePage';
import ProtectedRoute from './ProtectedRoute.tsx';

export const routes = [
  {
    path: ROUTES.AUTH,
    element: <AuthPage />,
  },
  {
    path: ROUTES.RECIPE_LIST,
    element: <RecipeListPage />,
  },
  {
    path: ROUTES.RECIPE_DETAIL,
    element: <RecipeDetailPage />,
  },
  {
    path: ROUTES.FAVORITES,
    element: (
      <ProtectedRoute>
        <FavoritesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.PROFILE,
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
];
