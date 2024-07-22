const Book = require('../models/book');

// Add a new book
exports.addBook = async (req, res) => {
    const { title, author } = req.body;

    try {
        const book = new Book({ title, author });
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a book
exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, available } = req.body;

    try {
        const book = await Book.findByIdAndUpdate(id, { title, author, available }, { new: true });

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Borrow a book
exports.borrowBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id);
        if (!book || !book.available) {
            return res.status(400).json({ message: 'Book not available' });
        }

        book.available = false;
        await book.save();

        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Return a book
exports.returnBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id);
        if (!book || book.available) {
            return res.status(400).json({ message: 'Book not borrowed' });
        }

        book.available = true;
        await book.save();

        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
