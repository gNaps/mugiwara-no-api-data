const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  title: { type: String, require: true },
  number: { type: Number, require: true },
  volume: { type: Number },
  release: { type: String },
  summary: { type: String },
  cover: { type: String },
  episodes: { type: [Number] },
  image: { type: String },
});

exports.Chapter = mongoose.model("chapter", chapterSchema);
