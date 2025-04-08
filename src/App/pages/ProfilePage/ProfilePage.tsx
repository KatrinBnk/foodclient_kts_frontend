import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@stores/hooks';
import Text from '@components/Text';
import Button from '@components/Button';
import { ROUTES } from '@configs/routes';
import styles from './ProfilePage.module.scss';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { authStore } = useStore();

  const handleSignOut = async () => {
    try {
      await authStore.signOutUser();
      navigate(ROUTES.AUTH);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleFavoritesClick = () => {
    navigate(ROUTES.FAVORITES);
  };

  if (!authStore.user) {
    handleSignOut();
    navigate(ROUTES.AUTH);
    return null;
  }

  return (
    <div className={styles.profile}>
      <div className={styles.profile__content}>
        <Text view="title" tag="h1" weight="bold" className={styles.profile__title}>
          My account
        </Text>

        {/*NOTE: профиль без фото? Нужно проверить*/}
        <div className={styles.profile__info}>
          <img
            src={authStore.user.photoURL || '/poster.png'}
            alt="avatar"
            className={styles.profile__avatar}
          />
          <div className={styles.profile__details}>
            <Text view="p-20" weight="bold">
              {authStore.user.displayName}
            </Text>
            <Text view="p-16" color="secondary">
              {authStore.user.email}
            </Text>
          </div>
        </div>

        <div className={styles.profile__actions}>
          <Button onClick={handleFavoritesClick} className={styles.profile__button}>
            Saved recipes
          </Button>
          <Button onClick={handleSignOut} className={styles.profile__button}>
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
};

export const ProfilePageComponent = observer(ProfilePage);
export default ProfilePageComponent;
