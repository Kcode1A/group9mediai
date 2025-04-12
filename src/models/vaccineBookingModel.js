const mongoose = require("mongoose");

const vaccineBookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  vaccineId: { type: mongoose.Schema.Types.ObjectId, ref: "Vaccine" },
  hospital: String,
  scheduleDate: String,
  scheduleTime: String,
  paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
  isCancelled: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("VaccineBooking", vaccineBookingSchema);