import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@components/Header';
import styles from './MainLayout.module.scss';

const MainLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
