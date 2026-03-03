const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./confiq/db");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
//DATABACE CONNECTION
connectDB()

//IMAGE ACCESSING 
app.use("/uploads", express.static("uploads"));

//API END POINTS
app.use('/api/user',require('./routes/userroutes.js'))
app.use('/api/post',require('./routes/postroutes.js'))
app.use('/api/comment',require('./routes/commentroutes.js'))

//CHECK API
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));