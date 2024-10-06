import StoreModule from '../module';

class CategoryState extends StoreModule {
    initState() {
        return {
            categories: [],
        };
    };

    async getListCategories() {
        const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)`);
        const json = await response.json();
    
        this.setState({
          ...this.getState(),
          categories: this.sortCategories(json.result.items),
        });
      }
      sortCategories(categories) {
        const sortedСategories = [];
        let countParents = 0;
    
        categories = categories.sort(item => item.parent ? 1 : -1);
    
        function addItem(item) {
          // если категории item еще нет
          if (!sortedСategories.find(item1 => item1._id === item._id)) { 
            sortedСategories.push({...item, title: '- '.repeat(countParents) + item.title})
          }
          countParents++;
    
          categories.forEach(child => {
            if (!child.parent) { 
              return
            }
            // если мы нашли ребенка от item
            if (child.parent._id === item._id) {
              addItem(child);
            }
          })
          countParents--
        }
    
        categories.forEach(item => {
          addItem(item);
        });
    
        return sortedСategories;
      }
}

export default CategoryState;