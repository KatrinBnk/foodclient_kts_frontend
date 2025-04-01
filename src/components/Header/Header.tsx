import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import HeartIcon from '@components/Icons/HeartIcon';
import UserIcon from '@components/Icons/UserIcon';
import logo from './logo.svg';
import { menuItems, MenuItem } from './config';
import Text from '@components/Text';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? styles['header__nav-link--active'] : '';

const Header: React.FC = () => {
  const location = useLocation();
  const isRecipesActive = location.pathname === '/' || location.pathname.startsWith('/recipe/');

  return (
    <div className={styles['header']}>
      <Link to="/" className={styles['header__logo']}>
        <img src={logo} />
        <Text tag="h1" view="p-20" weight="bold" className="header__logo-title">
          Food Client
        </Text>
      </Link>
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
      <div>
        <Link to="/favorites" className={styles['header__favorites']}>
          <HeartIcon width={19} height={19} color="brand" />
        </Link>
        <Link to="/profile" className={styles['header__profile']}>
          <UserIcon width={24} height={24} color="brand" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
