const { Schema, model } = require("mongoose");

const Resultschema = new Schema({
  enrollmentNumber: { type: String }, // No 'required' or 'unique' here
  papertitless: { type: String, required: true },
  paperidsss: { type: String, required: true },
  totalMarks: { type: Number, required: true },
  grade: { type: String, required: true },
  percentage: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Resultmodel = model("Resultss", Resultschema);

module.exports = Resultmodel;
