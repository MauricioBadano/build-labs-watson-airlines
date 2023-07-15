const Flight = require("./flightSchema");

async function flightSearchDO(destinationId,originId){
    const vuelos = await Flight.find({DESTINATION_AIRPORT: destinationId, ORIGIN_AIRPORT: originId});
    return vuelos;
}

async function flightSearchAD(airline,date){
    const vuelos = await Flight.find({DEPARTURE_DATE: date, AIRLINE: airline});
    return vuelos;
}
module.exports = {flightSearchDO,flightSearchAD};