const express = require("express");
const verifyToken = require("../Middleware/authMiddleware");
const { getPostComment, SentComment } = require("../controllers/comments");
const router = express.Router();


// GET → POST AND COMMENTS
router.get("/post/:id",verifyToken, getPostComment);
// POST → SEND NEW COMMENT
router.post("/sent/:id",verifyToken, SentComment);

module.exports = router;