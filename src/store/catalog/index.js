import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      countPages: 0,
      currentPage: 1,
      item: {},
    };
  }

  async load( limit = 10, skip) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        countPages: Math.ceil(json.result.count / limit),
      },
      'Загружены товары из АПИ',
    );
  }
  async loadOne(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=_id,madeIn(title,code),category(title),edition,description,price,title`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        item: json.result,
      })
  }
  clearItem() {
    this.setState(
      {
        ...this.getState(),
        item: {},
      },
    );
  }
  setCurrentPage(page) {
    this.setState(
      {
        ...this.getState(),
        currentPage: page,
      },
    );
  }
 }

export default Catalog;
