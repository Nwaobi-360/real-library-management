const BookModel = require('../ModelBooks/BookModel');

const createBook = async (req, res) => {
    try {
        const { BookName, AuthorName, Publisher, Price, Pages, Genre, Type, Lang } = req.body;

        if (!BookName || !AuthorName || !Publisher || !Price || !Pages || !Genre || !Type || !Lang) {
            return res.status(400).json({
                message: 'Please provide all necessary information',
            });
        }

        // Validate and create a new book
        const newBook = new BookModel({
            BookName,
            AuthorName,
            Publisher,
            Price,
            Pages,
            Genre,
            Type,
            Lang
        });

        // Save the new book to the database
        await newBook.save();

        res.status(201).json({
            message: 'Book created successfully',
            data: newBook
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating book',
            error: error.message
        });
    }
};

const BookModel = require('../Models/BookModel');

const getAllBooks = async (req, res) => {
    try {
        const allBooks = await BookModel.find();
        res.status(200).json({
            message: 'All books retrieved successfully',
            data: allBooks,
        });
    } catch (error) {
        console.error('Error retrieving books:', error);
        res.status(500).json({
            message: 'Error retrieving books',
            error: error.message,
        });
    }
};


const BookModel = require('../Models/BookModel');

const getBookById = async (req, res) => {
    const bookId = req.params.id;

    try {
        const foundBook = await BookModel.findById(bookId);

        if (!foundBook) {
            return res.status(404).json({
                message: 'Book not found',
            });
        }

        res.status(200).json({
            message: 'Book retrieved successfully',
            data: foundBook,
        });
    } catch (error) {
        console.error('Error retrieving book:', error);
        res.status(500).json({
            message: 'Error retrieving book',
            error: error.message,
        });
    }
};


const updateBookById = async (req, res) => {
    const bookId = req.params.id;
    const updates = req.body;

    try {
        const updatedBook = await BookModel.findByIdAndUpdate(bookId, updates, { new: true });

        if (!updatedBook) {
            return res.status(404).json({
                message: 'Book not found',
            });
        }

        res.status(200).json({
            message: 'Book updated successfully',
            data: updatedBook,
        });
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({
            message: 'Error updating book',
            error: error.message,
        });
    }
};



const deleteBookById = async (req, res) => {
    const bookId = req.params.id;

    try {
        const deletedBook = await BookModel.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.status(404).json({
                message: 'Book not found',
            });
        }

        res.status(200).json({
            message: 'Book deleted successfully',
            data: deletedBook,
        });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({
            message: 'Error deleting book',
            error: error.message,
        });
    }
};


module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById,
};
