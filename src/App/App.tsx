import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ROUTES } from '@configs/routes';
import StoreProvider from '@stores/context';
import { useStore } from '@stores/hooks';
import RecipeListPage from '@pages/RecipeListPage';
import RecipeDetailPage from '@pages/RecipeDetailPage';
import FavoritesPage from '@pages/FavoritesPage';
import AuthPage from '@pages/AuthPage';
import ProfilePage from '@pages/ProfilePage';
import MainLayout from '@components/Layouts/MainLayout';
import Loader from '@components/Loader';

// TODO: скорее всего поменять BrouserRouter на HashRouter (если нужно будет деплоить на gh-pages) и разнести нормально

const ProtectedRoute = observer(({ children }: { children: React.ReactNode }) => {
  const { authStore } = useStore();

  //TODO: привести к нормальному виду
  if (authStore.isLoading) {
    return <Loader />;
  }

  if (!authStore.isAuthenticated) {
    return <Navigate to={ROUTES.AUTH} />;
  }

  return <>{children}</>;
});

const App = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.AUTH} element={<AuthPage />} />
            <Route path={ROUTES.RECIPE_LIST} element={<RecipeListPage />} />
            <Route path={ROUTES.RECIPE_DETAIL} element={<RecipeDetailPage />} />
            <Route
              path={ROUTES.FAVORITES}
              element={
                <ProtectedRoute>
                  <FavoritesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.PROFILE}
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
