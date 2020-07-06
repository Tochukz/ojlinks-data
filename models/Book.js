const Model = require('./Model');

class Book extends Model{
    constructor() {
      super();
      this.table = 'books';
      this.primaryKey = 'bookId';
    }
}

module.exports = Book;