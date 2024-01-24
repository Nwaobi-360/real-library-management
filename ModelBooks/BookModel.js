const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    BookName: {
        type: String,
        required: true
    },
    AuthorName: {
        type: String,
        required: true
    },
    Publisher: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Pages: {
        type: Number,
        required: true
    },
    Genre: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Lang: {
        type: String,
        required: true
    }
});

const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;
