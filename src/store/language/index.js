import basket from '../../app/basket';
import { language } from '../exports';
import StoreModule from '../module';

class Language extends StoreModule {

  initState() {
    return {
        resources: {
          ru: {
            shop: 'Магазин',
            add: 'Добавить',
            main: 'Главная',
            close: 'Закрыть',
            goTo: 'Перейти',
            inBasket: 'В корзине',
            empty: 'Пусто',
            total: 'Итого',
            delete: 'Удалить',
            basket: 'Корзина',
          },
          en: {
            shop: 'Shop',
            add: 'Add',
            main: 'Main',
            close: 'Close',
            goTo: 'Go to',
            inBasket: 'In basket',
            empty: 'Empty',
            total: 'Total',
            delete: 'Delete',
            basket: 'Basket',
          },
        },
        languageMode: 'ru',
    };
  }

  getResources() {
    return this.getState().resources[this.getState().languageMode];
  }
  
  switchLanguage(language) {
    this.setState({ 
        ...this.getState(), 
        languageMode: language 
    });
  }


}

export default Language;
