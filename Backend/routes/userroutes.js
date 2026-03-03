const express = require("express");
const { registerUser, loginUser, loggedUser, EditUser, getallUser, ProfileUser, sendRequest, RequestUsers, acceptFollowRequest } = require("../controllers/user");
const verifyToken = require("../Middleware/authMiddleware");
const upload = require("../Middleware/multerMiddleware");
const router = express.Router();


// POST → REGISTER USER
router.post("/register", registerUser);
// POST → LOGIN USER
router.post("/login", loginUser)
// GET → USER LOGED
router.get("/Logged", verifyToken, loggedUser)
// PATCH → USER DATA
router.patch('/update', verifyToken, upload.fields([
  { name: "profilePic", maxCount: 1 },
  { name: "coverPic", maxCount: 1 },
]), EditUser)

// GET → ALL USERS
router.get("/all", verifyToken, getallUser)

// GET → USER PROF
router.get("/profile/:id", verifyToken, ProfileUser)

// GET → SEND REQUEST
router.get("/sendrequest/:id", verifyToken, sendRequest)

// GET → REQUESTED USERS
router.get("/requests", verifyToken, RequestUsers)

//GET 
router.get('/acceptfollowrequest/:id',verifyToken,acceptFollowRequest)

module.exports = router;