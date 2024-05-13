const mongoose = require("mongoose");

const interestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  img: {
    type: String,
  },
});
module.exports = mongoose.model("Interest", interestSchema);
