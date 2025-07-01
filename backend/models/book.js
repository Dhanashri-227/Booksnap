const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    summary: {
        type:[ String],
        required: true
    },

    coverImage: {
        type: String,
        required: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true });

const Book = mongoose.model("Books", bookSchema);
module.exports = Book;



// const {
//   getBooks,
//   getBook,
//   addBook,
//   editBook,
//   deleteBook
// } = require("../controller/Book");
