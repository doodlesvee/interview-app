const mongoose = require("mongoose");

const salesSchema = mongoose.Schema({
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  sold: {
    type: Boolean,
  },
  dateOfSale: {
    type: Date,
  },
});

module.exports = mongoose.model("sales", salesSchema);
