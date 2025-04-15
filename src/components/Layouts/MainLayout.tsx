import React from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderMobile, HeaderDeck } from '@components/Header';
import { useMediaQuery } from '@utils/useMediaQuery';

const MainLayout: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className='main-layout'>
      {isMobile ? <HeaderMobile /> : <HeaderDeck />}
      <main className='main-layout__content'>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
