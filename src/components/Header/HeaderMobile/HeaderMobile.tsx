import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styles from './HeaderMobile.module.scss';
import logo from '../logo.svg';
import { menuItems, MenuItem } from '../config.ts';
import Text from '@components/Text';
import { useStore } from '@stores/hooks';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? styles['header-mobile__nav-link--active'] : '';

const HeaderMobile: React.FC = observer(() => {
  const location = useLocation();
  const { authStore } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isRecipesActive = location.pathname === '/' || location.pathname.startsWith('/recipe/');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
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

      <div className={`${styles['header-mobile__menu']} ${isMenuOpen ? styles['header-mobile__menu--active'] : ''}`}>
        <nav className={styles['header-mobile__nav']}>
          {menuItems.map((item: MenuItem) => (
            (item.isProtected ? authStore.isAuthenticated : true) &&
            <NavLink
              key={item.link}
              to={item.link}
              className={
                item.link === '/'
                  ? () => (isRecipesActive ? styles['header-mobile__nav-link--active'] : '')
                  : getLinkClass
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {item.title}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
});

export default HeaderMobile;
