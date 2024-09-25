import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Basket() {
  const store = useStore();
  const resource = store.actions.language.getResources();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.basket.languageMode,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} resource={resource} />;
      },
      [callbacks.removeFromBasket],
    ),
  };

  return (
    <ModalLayout title={resource.basket} onClose={callbacks.closeModal} resource={resource}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} resource={resource} />
    </ModalLayout>
  );
}

export default memo(Basket);
