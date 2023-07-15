const Airline = require("./airlinesSchema");

async function allAirlines(){
    const aerolineas = await Airline.find({});
    return aerolineas;
}

module.exports = {allAirlines};