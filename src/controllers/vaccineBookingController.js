const VaccineBooking = require("../models/vaccineBookingModel");

exports.createBooking = async (req, res) => {
  try {
    const { vaccineId, scheduleDate, scheduleTime, hospital } = req.body;
    const userId = req.userId;

    const booking = new VaccineBooking({ userId, vaccineId, scheduleDate, scheduleTime, hospital });
    await booking.save();

    res.status(201).json({ success: true, message: "Đặt lịch thành công", data: booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await VaccineBooking.find({ userId: req.userId }).populate('vaccineId');
    res.json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await VaccineBooking.find().populate('vaccineId userId');
    res.json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await VaccineBooking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: "Không tìm thấy booking" });

    booking.isCancelled = true;
    await booking.save();
    res.json({ success: true, message: "Đã huỷ lịch", data: booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
