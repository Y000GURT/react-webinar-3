import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import useStore from '../hooks/use-store';
import Main from './main';
import Basket from './basket';
import Article from './article';
import AuthPage from './auth-page';
import Profile from './profile';
import PrivateRoute from './private-route';
/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);
  const store = useStore()

  useEffect( () => {
    store.actions.auth.autoLogin()
  }, [])
  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/auth'} element={<AuthPage />} />
        <Route path={'/profile'} element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
