import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@stores/hooks';
import styles from './AuthPage.module.scss';
import Loader from '@components/Loader';
import Text from '@components/Text';
import Button from '@components/Button';

const AuthPage: React.FC = () => {
  const { authStore } = useStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (authStore.isAuthenticated) {
      navigate('/');
    }
  }, [authStore.isAuthenticated, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await authStore.signInWithGoogle();
      navigate('/');
    } catch (error) {
      alert('Error signing in with Google. Please try again.');
      console.error('Failed to sign in:', error);
    }
  };

  if (authStore.isLoading) {
    return (
      <div className={styles.auth}>
        <div className={styles.auth__loader}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.auth}>
      <div className={styles.auth__content}>
        <div className={styles.auth__header}>
          <Text view="p-20" tag="h1" weight="bold" className={styles.auth__title}>
            Welcome to FoodClient!
          </Text>
          <Text view="p-18" color="secondary" className={styles.auth__subtitle}>
            Sign in to access additional features
          </Text>
        </div>

        <Button
          className={styles.auth__button}
          onClick={handleGoogleSignIn}
          loading={authStore.isLoading}
        >
          <div className={styles['auth__button-content']}>
            <img src="/google-icon.svg" alt="Google" className={styles['auth__button-icon']} />
            <Text view="p-16" color="button-text">
              Sign in with Google
            </Text>
          </div>
        </Button>
      </div>
    </div>
  );
};

export const AuthPageComponent = observer(AuthPage);
export default AuthPageComponent;
