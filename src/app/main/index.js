import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { Outlet, useParams } from 'react-router-dom';

function Main() {
  const store = useStore();
  const params = useParams();
  const resource = store.actions.language.getResources();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    resource: state.language.languageMode,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} resource={resource} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title={resource.shop} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} resource={resource} />
      {
        params.id 
        ?
        <Outlet />
        :
        <>
          <List list={select.list} renderItem={renders.item} />
          <Pagination count={select.count} />
        </>
      }
    </PageLayout>
  );
}

export default memo(Main);
