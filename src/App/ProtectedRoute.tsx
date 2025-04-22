import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { useStore } from '@stores/hooks';
import { ROUTES } from '@configs/routes';
import Loader from '@components/Loader';
import styles from './ProtectedRoute.module.scss';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = observer(({ children }: ProtectedRouteProps) => {
  const { authStore } = useStore();

  if (authStore.isLoading) {
    return <div className={styles.loader}>
      <Loader size="m" />
    </div>;
  }

  if (!authStore.isAuthenticated) {
    return <Navigate to={ROUTES.AUTH} />;
  }

  return <>{children}</>;
});

export default ProtectedRoute;