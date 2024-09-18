import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import useModal from './hooks/useModal';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const [isShowingModal, toggleModal] = useModal();

  const callbacks = {
    onAddToBasket: useCallback(item => {
        store.addToBasket(item);
      },[store],
    ),

    onDeleteFromBasket: useCallback(code => {
      store.deleteFromBasket(code)
    }, [store]),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),
  };

  return (
    <PageLayout>
      <Modal store={store} show={isShowingModal} toggleModal={toggleModal}/>
      <Head title="Магазин" />
      <Controls count={store.getCountBasket()} price={store.getPriceBasket()} onAdd={callbacks.onAddItem} onOpen={toggleModal}/>
      <List
        list={list}
        onAddToBasket={callbacks.onAddToBasket}
      />
    </PageLayout>
  );
}

export default App;
