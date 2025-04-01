import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import HeartIcon from '@components/Icons/HeartIcon';
import UserIcon from '@components/Icons/UserIcon';
import logo from './logo.svg';
import { menuItems, MenuItem } from './config';

const getLinkClass = ({ isActive }: { isActive: boolean }) => (isActive ? styles.active : '');

const Header: React.FC = () => {
  const location = useLocation();
  const isRecipesActive = location.pathname === '/' || location.pathname.startsWith('/recipe/');

  return (
    <div className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src={logo} />
        <h1 className={styles.logo__title}>Food Client</h1>
      </Link>
      <nav className={styles.nav}>
        {menuItems.map((item: MenuItem) => (
          <NavLink
            key={item.link}
            to={item.link}
            className={item.link === '/' ? () => (isRecipesActive ? styles.active : '') : getLinkClass}
          >
            {item.title}
          </NavLink>
        ))}
      </nav>
      <div>
        <Link to="/favorites" className={styles.favorites}>
          <HeartIcon width={19} height={19} color="brand" />
        </Link>
        <Link to="/profile" className={styles.profile}>
          <UserIcon width={24} height={24} color="brand" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
