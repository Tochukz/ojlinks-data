const Model = require('./Model');

class Category extends Model{
    constructor() {
      super();
      this.table = 'categories';
      this.primaryKey = 'categoryId';
    }
}

module.exports = Category;