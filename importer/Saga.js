const mongoose = require("mongoose");

const sagaSchema = new mongoose.Schema({
  name: { type: String, require: true },
  summary: { type: String },
  episodes: { type: [Number] },
  chapters: { type: [Number] },
  volumes: { type: [Number] },
});

exports.Saga = mongoose.model("saga", sagaSchema);
