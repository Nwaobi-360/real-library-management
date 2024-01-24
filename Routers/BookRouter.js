// bookRouter.js
const express = require('express');
const router = express.Router();
const {
    createBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById,
} = require('../BookControllers/BookControllers');

router.post('/createBook', createBook);
router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.put('/books/:id', updateBookById);
router.delete('/books/:id', deleteBookById);

module.exports = router;
