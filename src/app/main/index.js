import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import MainMenu from '../../components/main-menu';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';

function Main() {
  const store = useStore();
  const resource = store.actions.language.getResources();
  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    countPages: state.catalog.countPages,
    currentPage: state.catalog.currentPage,
    languageMode: state.language.languageMode,
  }));

  useEffect(() => {
    store.actions.catalog.load(10, (select.currentPage - 1) * 10);
  }, []);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    setCurrentPage: useCallback(page => store.actions.catalog.setCurrentPage(page), [store]),
    load: useCallback((limit, skip) => store.actions.catalog.load(limit, skip), [store]),
    switchLanguage: useCallback(language => store.actions.language.switchLanguage(language), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} id={item._id} onAdd={callbacks.addToBasket} resource={resource} />;
      },
      [callbacks.addToBasket, resource],
    ),
  };

  return (
    <PageLayout>
      <MainMenu 
        title={resource.shop} 
        onOpen={callbacks.openModalBasket} 
        amount={select.amount} 
        sum={select.sum} 
        resource={resource} 
        switchLanguage={callbacks.switchLanguage} 
        languageMode={select.languageMode}
      />
      <List list={select.list} renderItem={renders.item} />
      <Pagination 
        currentPage={select.currentPage} 
        countPages={select.countPages} 
        setCurrentPage={callbacks.setCurrentPage} 
        load={callbacks.load}
      />
    </PageLayout>
  );
}

export default memo(Main);
