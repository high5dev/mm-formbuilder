const mongoose = require("mongoose");

const localStorageSchema = mongoose.Schema(
  {
    token: { type: String, require: true },
    storage: { type: Object },
  },
  { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("local-storage", localStorageSchema);