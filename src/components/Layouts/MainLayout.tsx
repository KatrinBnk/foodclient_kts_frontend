import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@components/Header';

const MainLayout: React.FC = () => {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-layout__content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
