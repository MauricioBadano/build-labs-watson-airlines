const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  AIRLINE: { type: String, required: true },
  FLIGHT_NUMBER: { type: Number, required: true },
  ORIGIN_AIRPORT: { type: String, required: true },
  DESTINATION_AIRPORT: { type: String, required: true },
  CANCELLED: { type: Boolean, default: false },
  DEPARTURE_DATE: { type: Date, required: true },
  ARRIVAL_DATE: { type: Date, required: true }
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;

