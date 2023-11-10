const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookingSchema = new Schema({
  place: { type: mongoose.Schema.Types.ObjectId, ref: "Place", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  numberOfGuests: { type: Number, required: true },
  guestName: { type: String, required: true },
  mobile: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Booking", BookingSchema);
