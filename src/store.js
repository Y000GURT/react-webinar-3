/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.maxCode = this.state.list.length + 1 
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

  // генератор для создания уникального кода
  *createCode() {
    let id = this.maxCode;
    while (true) {
      yield id++;
    }
  }
  /**
   * Добавление новой записи
   */
  addItem() {
    const generator = this.createCode();
    
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: generator.next().value, title: 'Новая запись', count: 0 }],
    });

    this.maxCode++
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          if (!item.selected) { // если item не был выделен, то увеличиваем счетчик выделений
            item.count++;
          }
          item.selected = !item.selected;
        }
        else {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
