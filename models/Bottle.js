const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  message: 'string', // INCLUDE ACTUAL COORDINATES !!!!
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Create Schema
const BottleSchema = new Schema({
  prompt: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  responses: [{
    text: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    location: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  date: {
    type: Date,
    default: Date.now
  },
  destination: {  // INCLUDE ACTUAL COORDINATES !!!!
    type: String,
    required: true
  },
  latestLocation: {
    type: String,
    default: ""
  }
});
module.exports = Bottle = mongoose.model("bottle", BottleSchema);