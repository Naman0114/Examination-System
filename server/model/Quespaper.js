// backend/model/AllQuestion.js
const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
  paperID:[{type:Number}],
  questionText: { type: String,  },
  options: { 
    type: [String], 
    
  },
  correctAnswer: { 
    type: String, 
    
  },
  createdAt: {
      type: Date,
      default: Date.now,
    },
});

const Questions = model('Questions', questionSchema);
module.exports = Questions;
