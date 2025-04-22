import { Routes, Route, HashRouter } from 'react-router-dom';
import StoreProvider from '@stores/context';
import MainLayout from '@/App/Layouts/MainLayout';
import { routes } from './routes';

const App = () => {
  return (
    <StoreProvider>
      <HashRouter>
        <Routes>
          <Route element={<MainLayout />}>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
        </Routes>
      </HashRouter>
    </StoreProvider>
  );
};

export default App;
