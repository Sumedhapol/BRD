const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    sleep: {
      type: Number,
      required: true
    },
    stress: {
      type: Number,
      required: true,
      min: 1,
      max: 10
    },
    study: {
      type: Number,
      required: true
    },
    mood: {
      type: Number,
      required: true,
      min: 1,
      max: 10
    },
    score: {
      type: Number,
      required: true
    },
    riskLevel: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entry", entrySchema);
