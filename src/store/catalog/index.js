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
      count: 0,
      item: {},
    };
  }

  async load( limit = 10, skip = 0) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
      },
      'Загружены товары из АПИ',
    );
  }
  async loadOne(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=madeIn(title,code),category(title),edition,description,price,title`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        item: json.result,
      })
  }
 }

export default Catalog;
