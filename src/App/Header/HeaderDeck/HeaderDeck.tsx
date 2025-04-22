import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styles from './HeaderDeck.module.scss';
import HeartIcon from '@components/Icons/HeartIcon';
import UserIcon from '@components/Icons/UserIcon';
import logo from '../logo.svg';
import { getMenuItems, MenuItem } from '../config.ts';
import Text from '@components/Text';
import { useStore } from '@stores/hooks';
import { ROUTES } from '@configs/routes.ts';
import { useRandomRecipeNavigation } from '../useRandomRecipeNavigation.ts';
import ToastNotification from '@components/ToastNotification';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? styles['header__nav-link--active'] : styles['header__nav-link'];

const HeaderDeck: React.FC = observer(() => {
  const location = useLocation();
  const { authStore } = useStore();
  const { handleClick, showNoRecipesToast, setShowNoRecipesToast } = useRandomRecipeNavigation();
  const isRecipesActive = location.pathname === '/' || location.pathname.startsWith('/recipe/');

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    getMenuItems().then(items => setMenuItems(items));
  }, []);

  return (
    <>
      <div className={styles['header']}>
        <Link to="/" className={styles['header__logo']}>
          <img src={logo} alt="logo" />
          <Text tag="h1" view="p-20" weight="bold" className="header__logo-title">
            Food Client
          </Text>
        </Link>
        <nav className={styles['header__nav']}>
          {menuItems.map((item: MenuItem) =>
            !item.isForMobile && (item.isProtected ? authStore.isAuthenticated : true) ? (
              <NavLink
                key={item.link}
                to={item.link}
                onClick={item.isRandom ? handleClick : () => {}}
                className={
                  item.link === '/'
                    ? () =>
                        isRecipesActive
                          ? styles['header__nav-link--active']
                          : styles['header__nav-link']
                    : getLinkClass
                }
              >
                {item.title}
              </NavLink>
            ) : null
          )}
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
      {showNoRecipesToast && (
        <ToastNotification
          message="There are no recipes available, update the search parameters."
          type="error"
          duration={3000}
          onClose={() => setShowNoRecipesToast(false)}
        />
      )}
    </>
  );
});

export default HeaderDeck;
