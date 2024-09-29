import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import ItemPage from './item-page';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';


/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      {activeModal === 'basket' && <Basket />} 
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="item/:id" element={<ItemPage />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
