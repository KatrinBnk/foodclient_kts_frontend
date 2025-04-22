import React from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderMobile, HeaderDeck } from '@/App/Header';
import { useMediaQuery } from '@utils/useMediaQuery.ts';

const MainLayout: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="main-layout">
      {isMobile ? <HeaderMobile /> : <HeaderDeck />}
      <main className="main-layout__content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
