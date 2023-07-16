const Flight = require("./flightSchema");

async function flightSearchDO(destinationId,originId){
    const flights = await Flight.find({DESTINATION_AIRPORT: destinationId, ORIGIN_AIRPORT: originId});
    return flights;
}

async function flightSearchAD(airline,date){
    const flights = await Flight.find({DEPARTURE_DATE: date, AIRLINE: airline});
    return flights;
}

async function flightSearchID(id){
    const flights = await Flight.findById(id);
    return flights;
}
module.exports = {flightSearchDO,flightSearchAD,flightSearchID};