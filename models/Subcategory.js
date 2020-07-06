const Model = require('./Model');

class Subcategory extends Model{
    constructor() {
      super();
      this.table = 'subcategories';
      this.primaryKey = 'subcategoryId';
    }
}

module.exports = Subcategory;