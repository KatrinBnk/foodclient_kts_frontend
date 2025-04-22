import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styles from './HeaderMobile.module.scss';
import logo from '../logo.svg';
import { getMenuItems, MenuItem } from '../config.ts';
import Text from '@components/Text';
import { useStore } from '@stores/hooks';
import { useRandomRecipeNavigation } from '../useRandomRecipeNavigation';
import ToastNotification from '@components/ToastNotification';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? styles['header-mobile__nav-link--active'] : '';

const HeaderMobile: React.FC = observer(() => {
  const location = useLocation();
  const { authStore } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isRecipesActive = location.pathname === '/' || location.pathname.startsWith('/recipe/');
  const { handleClick, showNoRecipesToast, setShowNoRecipesToast } = useRandomRecipeNavigation();

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    getMenuItems().then(items => setMenuItems(items));
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleItemClick = (item: MenuItem) => (event: React.MouseEvent) => {
    if (item.isRandom) {
      event.preventDefault();
      handleClick(event);
    }
    setIsMenuOpen(false);
  };

  const shouldShowMenuItem = (item: MenuItem) => {
    if (item.isProtected === undefined) return true;
    if (!item.isProtected) return !authStore.isAuthenticated;
    return authStore.isAuthenticated;
  };

  return (
    <>
      <div className={styles['header-mobile']}>
        <div className={styles['header-mobile__top']}>
          <Link to="/" className={styles['header-mobile__logo']}>
            <img src={logo} alt="logo" />
            <Text tag="h1" view="p-16" weight="bold">
              Food Client
            </Text>
          </Link>
          <button
            className={`${styles['header-mobile__burger']} ${isMenuOpen ? styles['header-mobile__burger--active'] : ''}`}
            onClick={toggleMenu}
          >
            <span className={styles['header-mobile__burger-line']}></span>
            <span className={styles['header-mobile__burger-line']}></span>
            <span className={styles['header-mobile__burger-line']}></span>
          </button>
        </div>

        <div
          className={`${styles['header-mobile__menu']} ${isMenuOpen ? styles['header-mobile__menu--active'] : ''}`}
        >
          <nav className={styles['header-mobile__nav']}>
            {menuItems.map(
              (item: MenuItem) =>
                shouldShowMenuItem(item) && (
                  <NavLink
                    key={item.link}
                    to={item.link}
                    className={
                      item.link === '/'
                        ? () => (isRecipesActive ? styles['header-mobile__nav-link--active'] : '')
                        : getLinkClass
                    }
                    onClick={handleItemClick(item)}
                  >
                    {item.title}
                  </NavLink>
                )
            )}
          </nav>
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

export default HeaderMobile;
