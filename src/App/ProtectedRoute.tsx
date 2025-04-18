import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { useStore } from '@stores/hooks';
import { ROUTES } from '@configs/routes';
import Loader from '@components/Loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = observer(({ children }: ProtectedRouteProps) => {
  const { authStore } = useStore();

  if (authStore.isLoading) {
    return <Loader />;
  }

  if (!authStore.isAuthenticated) {
    return <Navigate to={ROUTES.AUTH} />;
  }

  return <>{children}</>;
});

export default ProtectedRoute;