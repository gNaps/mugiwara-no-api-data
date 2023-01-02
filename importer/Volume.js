const mongoose = require("mongoose");

const volumeSchema = new mongoose.Schema({
  number: { type: Number, require: true },
  title: { type: String, require: true },
  chapters: { type: [Number], require: true },
  summary: { type: String, require: true },
});

exports.Volume = mongoose.model("volume", volumeSchema);
