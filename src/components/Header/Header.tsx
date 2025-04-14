import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styles from './Header.module.scss';
import HeartIcon from '@components/Icons/HeartIcon';
import UserIcon from '@components/Icons/UserIcon';
import logo from './logo.svg';
import { menuItems, MenuItem } from './config';
import Text from '@components/Text';
import { useStore } from '@stores/hooks';
import { ROUTES } from '@configs/routes.ts';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? styles['header__nav-link--active'] : '';

const Header: React.FC = observer(() => {
  const location = useLocation();
  const { authStore } = useStore();
  const isRecipesActive = location.pathname === '/' || location.pathname.startsWith('/recipe/');

  return (
    <div className={styles['header']}>
      <Link to="/" className={styles['header__logo']}>
        <img src={logo} alt="logo" />
        <Text tag="h1" view="p-20" weight="bold" className="header__logo-title">
          Food Client
        </Text>
      </Link>
      {/* TODO: переделать под использованние компонента текста??*/}
      <nav className={styles['header__nav']}>
        {menuItems.map((item: MenuItem) => (
          <NavLink
            key={item.link}
            to={item.link}
            className={
              item.link === '/'
                ? () => (isRecipesActive ? styles['header__nav-link--active'] : '-link')
                : getLinkClass
            }
          >
            {item.title}
          </NavLink>
        ))}
      </nav>
      <div className={styles['header__actions']}>
        {authStore.isAuthenticated ? (
          <>
            <Link to={ROUTES.FAVORITES} className={styles['header__actions-favorites']}>
              <HeartIcon width={19} height={19} color="brand" />
            </Link>
            <Link to={ROUTES.PROFILE} className={styles['header__actions-profile']}>
              <UserIcon width={24} height={24} color="brand" />
            </Link>
          </>
        ) : (
          <Link to={ROUTES.AUTH} className={styles['header__actions-login']}>
            <UserIcon width={24} height={24} color="brand" />
          </Link>
        )}
      </div>
    </div>
  );
});

export default Header;
