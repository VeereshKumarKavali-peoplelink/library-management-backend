const express = require('express');
const { addBook, getAllBooks, updateBook, deleteBook } = require('../controllers/bookController');
const { borrowBook, returnBook } = require('../controllers/bookController');
const router = express.Router();

const authMiddleware = require('../middleware/authmiddleware');

router.post('/', authMiddleware, addBook);
router.get('/', authMiddleware, getAllBooks);
router.put('/:id', authMiddleware, updateBook);
router.delete('/:id', authMiddleware, deleteBook);
router.patch('/borrow/:id', authMiddleware, borrowBook);
router.patch('/return/:id', authMiddleware, returnBook);


module.exports = router;
