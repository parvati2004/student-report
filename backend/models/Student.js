const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({ question: String, transcript: String, score: Number }, { _id: false });
const studentSchema = new mongoose.Schema({
  name: String,
  overall: Number,
  scores: { pronunciation: Number, fluency: Number, vocabulary: Number, grammar: Number },
  summary: String,
  questions: [questionSchema]
});
module.exports = mongoose.model('Student', studentSchema);
