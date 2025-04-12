const mongoose = require("mongoose");

const vaccineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: String,
  location: String,
  hospital: String,
  price: String,
  availableSlots: [String],
}, { timestamps: true });

module.exports = mongoose.model("Vaccine", vaccineSchema);
