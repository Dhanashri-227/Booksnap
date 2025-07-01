const express = require("express");
const router = express.Router();

// ✅ Import controller functions
const { userSignUp, userLogin, getUser } = require("../controller/user.js");

// ✅ Define routes
router.post("/signUp", userSignUp);
router.post("/login", userLogin);
router.get("/user/:id", getUser);

module.exports = router;
