const Vaccine = require("../models/vaccineModel");

exports.createVaccine = async (req, res) => {
  try {
    const newVaccine = new Vaccine(req.body);
    await newVaccine.save();
    res.status(201).json({ success: true, data: newVaccine });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getVaccines = async (req, res) => {
  const filter = {};
  if (req.query.location) filter.location = req.query.location;
  if (req.query.hospital) filter.hospital = req.query.hospital;

  try {
    const vaccines = await Vaccine.find(filter);
    res.json({ success: true, data: vaccines });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getVaccineById = async (req, res) => {
  try {
    const vaccine = await Vaccine.findById(req.params.id);
    if (!vaccine) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: vaccine });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateVaccine = async (req, res) => {
  try {
    const updated = await Vaccine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteVaccine = async (req, res) => {
  try {
    await Vaccine.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
