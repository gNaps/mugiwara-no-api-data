const mongoose = require("mongoose");

const episodeSchema = new mongoose.Schema({
  title: { type: String, require: true },
  number: { type: Number, require: true },
  release: { type: String },
  summary: { type: String },
  chapters: { type: [Number] },
  image: { type: String },
});

exports.Episode = mongoose.model("episode", episodeSchema);
