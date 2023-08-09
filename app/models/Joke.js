const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const jokeSchema = new Schema({
  question: String,
  answer: String,
  rating: Number,
});

const Joke = model('Joke', jokeSchema);
module.exports = Joke