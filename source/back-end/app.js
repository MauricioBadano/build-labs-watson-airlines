const express = require("express");
const path = require("path");
const airlines = require("./airlinesController");
const flights = require("./flightsController")
const Flight = require("./flightSchema.js");
const { log } = require("console");
async function main(){

    // Get global variables from .env file
    require("dotenv").config({path: path.resolve(__dirname,".env")});

    // Connect to database
    const { create_connection } = require("./mongodb.js");
    await create_connection();  
    const app = express();
    const port = 8080;
    app.get("/airlines", async (req,res)=> {
        try {
            const aerolineas = await airlines.allAirlines();
            const airlinesList = aerolineas.map((aerolinea) => aerolinea.AIRLINE);
            res.json(airlinesList); // Enviar solo las aerolineas como respuesta JSON al cliente
        } 
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    app.get("/watsonairlines", async (req,res)=> {
        try {
            res.send("Watson Airlines is a one of the largest airlines in America. With over 30 years of history, we connect people to opportunities while expanding the understanding of our planet and the people within it. We offer our one-of-a-kind value and Hospitality at over 50 airports across more than 15 countries. In addition, we are members of the International Air Transport Association (IATA), a trade association that represents over 300 airlines, equivalent to about 83% of total air traffic. This allows us to operate safely, securely, efficiently, and economically under clearly defined rules. We are pioneers in the usage of technology, and actively advocate for its usage to improve our customer's experience.")
        } 
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    })

    app.get("/flightsod/:originId/:destinationId", async (req, res)=> {
        try {
            const originId = req.params.originId;
            const destinationId = req.params.destinationId;
            const flightslist = await flights.flightSearchDO(destinationId,originId);
            res.json(flightslist);
        } 
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    })

    app.get("/flightsda/:date/:airline", async (req, res)=> {
        try {
            const date = req.params.date;
            const airline = req.params.airline;
            const flightslist = await flights.flightSearchAD(airline,date);
            res.json(flightslist)
        } 
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    })

    app.get("/flightsid/:id",async (req,res)=> {
        const id = req.params.id;
        const flightslist=await flights.flightSearchID(id);
        res.json(flightslist)
    })
    app.listen(port, () => {console.log("escuchando")})
}

main();