const mongoose = require('mongoose');

const airlinesSchema = new mongoose.Schema({
    IATA_CODE: { type: String, required: true },
    AIRLINE: { type: String, required: true },
  });
  
  const Airline = mongoose.model('Airline', airlinesSchema);
  
  module.exports = Airline;