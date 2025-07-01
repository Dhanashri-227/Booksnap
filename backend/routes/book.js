const express = require("express");
const router = express.Router();
const multer = require("multer");
// const upload = multer({ dest: "uploads" });
const verifyToken = require("../middleware/auth");

const {
  getBooks,
  getBook,
  addBook,
  editBook,
  deleteBook,
  upload
} = require("../controller/book");

// Routes
router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/", verifyToken, upload.single("file"), addBook);
router.put("/:id",upload.single("file"), editBook);
router.delete("/:id", deleteBook);

module.exports = router;
