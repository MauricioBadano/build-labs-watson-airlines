const mongoose = require('mongoose');

const airportsSchema = new mongoose.Schema({
    IATA_CODE: { type: String, required: true },
    AIRPORT: { type: String, required: true },
    CITY: { type: String, required: true },
    STATE: { type: String },
    COUNTRY: { type: String, required: true },
  });
  
  const Airport = mongoose.model('Airport', airportsSchema);
  
  module.exports = Airport;
  