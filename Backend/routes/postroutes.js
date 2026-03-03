const express = require("express");
const verifyToken = require("../Middleware/authMiddleware");
const upload = require("../Middleware/multerMiddleware");
const { createPost, getallPosts, profilePost, LikePost } = require("../controllers/post");
const router = express.Router();


// POST → CREATE POST
router.post("/upload",verifyToken,upload.single("media"), createPost);
// GET → ALL POST 
router.get("/getall",verifyToken, getallPosts);
// GET → ALL POST 
router.get("/profile/:id",verifyToken, profilePost);
// GET → POST LIKE 
router.get("/like/:id",verifyToken, LikePost);

module.exports = router;