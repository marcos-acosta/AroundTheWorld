const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({ message: 'string' });

// Create Schema
const BottleSchema = new Schema({
  prompt: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  responses: 
  [{
    text: String, // INCLUDE ACTUAL COORDINATES !!!!
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  date: {
    type: Date,
    default: Date.now
  },
  destination: {  // INCLUDE ACTUAL COORDINATES !!!!
    type: String,
    required: true
  }
});
module.exports = Bottle = mongoose.model("bottle", BottleSchema);