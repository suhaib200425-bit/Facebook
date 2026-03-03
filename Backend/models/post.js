const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  caption: {
    type: String,
    trim: true,
  },

  media: {
    type: String,   // uploads/fileName.jpg or .mp4
  },

  contentType: {
    type: String,
    enum: ["text", "image", "video"],
    required: true,
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],

  comments:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    }
  ],

}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);