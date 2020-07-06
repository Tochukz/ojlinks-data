var express = require('express');
var router = express.Router();

const Book = require('../models/Book');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');

const data = require('../data');
const categories = require('../data/categories');
const subcategories = require('../data/subcategories');
const books = require('../data/books');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/categories', (req, res, next) => {
  const categories = new Set();
  data.forEach(record => {
    categories.add(record.category)
  });
  const categoryArray = Array.from(categories).map((cat, index) => ({ categoryId: index + 1, category: cat}));
  return res.json(categoryArray);
});

router.get('/subcategories', (req, res, next) => {
  const subcategories = new Set();
  data.forEach(record => {
    subcategories.add(record.subcategory)
  });

  const subcategoryArray = Array.from(subcategories).map((subcat, index) => {
    const record= data.find(rec => rec.subcategory == subcat);
    const cat = categories.find(cat => cat.category == record.category);
    if (!cat) {
      console.log('')
      return res.send({'not found': record});
    }
    return { 
      subcategoryId: index + 1, 
      subcategory: subcat,
      categoryId: cat.categoryId,
    }
  });
  return res.json(subcategoryArray);
});

router.get('/books', (req, res, next) => {
  const books = data.map(book => {
    const cat = categories.find(c => c.category == book.category);
    const subcat = subcategories.find(s => s.subcategory == book.subcategory);
    if (!cat || !subcat) {
      return res.send({'not found': book});
    }
    const date = new Date().toISOString().substring(0, 10);
    book.bookId = book.id;
    book.categoryId = cat.categoryId;
    book.subcategoryId = subcat.subcategoryId;
    book.createdAt = date;
    book.updatedAt = date;
    book.deletedAt = '';

    delete book.category;
    delete book.subcategory;
    delete book.date_added;
    delete book.added_by;
    delete book.id;

    return book;
  });

  return res.json(books);
});

router.post('/seed', async (req, res, next) => {
  try {
    const categoryModel = new Category();
    const subcategoryModel = new Subcategory();
    const bookModel = new Book();  

    const cats = await categoryModel.insertMany(categories);
    const sub = await subcategoryModel.insertMany(subcategories);
    const bks = await bookModel.insertMany(books);
    res.send({ cats, sub, bks });
  } catch(err) {
    return next(err);
  }
});
module.exports = router;
