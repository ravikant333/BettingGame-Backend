const mongoose = require("mongoose");

const Playerschema = mongoose.Schema(
  {
    walletID: {
      type: String,
      required: true,
    },
    score: [Number],
  },
  { timestamp: true }
);

module.exports = mongoose.model("Player", Playerschema);
