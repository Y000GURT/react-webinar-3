/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  // Получение количества товаров в корзине
  getCountBasket() {
    return this.state.basket.length;
  }

  // Получение общей стоимости товаров в корзине
  getPriceBasket() {
    return this.state.basket.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  // Добавление товара в корзину
  addToBasket(code) {
    // если товар уже есть в корзине
    const isFounded = this.state.basket.find(item => item.code === code)
    if (isFounded) {
      this.setState({
        ...this.state,
        basket: this.state.basket.map(itemBasket => {
          if (itemBasket.code === code) {
            return {
              ...itemBasket,
              // то просто меняем количество
              quantity: itemBasket.quantity + 1
            }
          }
          return itemBasket
        })
      })
    }
    // если нет, то добавляем в корзину
    else {
      const foundItem = this.state.list.find(item => item.code === code);
      this.setState({
        ...this.state,
        basket: [...this.state.basket, {...foundItem, quantity: 1}]
      })
    }
  }

  // Удаление товара из корзины
  deleteFromBasket(code) {
    this.setState({
      ...this.state,
      basket: this.state.basket.filter(item => item.code !== code)
    })
  }
}

export default Store;
