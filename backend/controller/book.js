const Books = require("../models/book"); // ✅ Correct import
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.originalname;
    cb(null, filename);
  }
});


const upload = multer({ storage: storage })

// Get all Books
const getBooks = async (req, res) => {
  try {
    const allBooks = await Books.find(); // ✅ Use correct model name
    return res.json(allBooks);            // ✅ Return the correct variable
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch Books" });
  }
};

// Get single Book placeholder
const getBook = async (req, res) => {
  try {
    const Book = await Books.findById(req.params.id);
    res.json(Book);
  } catch (err) {
    res.status(404).json({ message: "Book not found" });
  }
};


const addBook = async (req, res) => {
  try {
    console.log("📥 BODY:", req.body);
    console.log("🖼 FILE:", req.file);

    const { title } = req.body;
    const summary = req.body.summary
      ? req.body.summary.split(",")
      : [];

    const imagePath = req.file?.path || null;

    if (!title || !summary.length) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = await Books.create({
      title,
      summary,
      coverImage: req.file?.filename,
      createdBy: req.user.id
    });

    return res.status(201).json(newBook);
  } catch (error) {
    console.error("🔥 Upload error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};





// Placeholders for edit and delete
const editBook = async (req, res) => {
  try {
    const Book = await Books.findById(req.params.id);
    if (!Book) {
      return res.status(404).json({ message: "Book not found" });
    }
    else {
      let coverImage = req.file?.filename ? req.file?.filename : Book.coverImage
      const updated = await Books.findByIdAndUpdate(req.params.id, { ...req.body, coverImage }, { new: true });
      res.json(updated);
    }
  } catch (err) {
    return res.status(500).json({ message: "Update failed" });
  }
};


const deleteBook = async (req, res) => {
  try {
    await Books.deleteOne({ _id: req.params.id })
    res.json({ status: "ok" })
  }
  catch (err) {
    return res.status(400).json({ message: "error" })
  }
};

module.exports = {
  getBooks,
  getBook,
  addBook,
  editBook,
  deleteBook,
  upload
};
