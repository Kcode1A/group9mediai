const express = require("express");
const router = express.Router();
const controller = require("../controllers/vaccineBookingController");
const authUser = require("../middleware/authUser"); // nếu có

router.post("/", authUser, controller.createBooking);
router.get("/my", authUser, controller.getMyBookings);
router.get("/all", controller.getAllBookings); // có thể gắn authAdmin sau
router.put("/cancel/:id", authUser, controller.cancelBooking);

module.exports = router;
