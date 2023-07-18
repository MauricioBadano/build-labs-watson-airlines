const swagger_autogen = require("swagger-autogen")({ openapi: "3.0.0" });

// Data schemas
const mongo_specs = {
    Flight: {
        type: "object",
        properties: {
            AIRLINE: {
                type: "string",
                required: true,
            },
            FLIGHT_NUMBER: {
                type: "number",
                required: true,
            },
            ORIGIN_AIRPORT: {
                type: "string",
                required: true,
            },
            DESTINATION_AIRPORT: {
                type: "string",
                required: true,
            },
            CANCELLED: {
                type: "boolean",
                default: false,
            },
            DEPARTURE_DATE: {
                type: "string",
                format: "date-time",
                required: true,
            },
            ARRIVAL_DATE: {
                type: "string",
                format: "date-time",
                required: true,
            },
        },
    },
    Airport: {
        type: "object",
        properties: {
            IATA_CODE: {
                type: "string",
                required: true,
            },
            AIRPORT: {
                type: "string",
                required: true,
            },
            CITY: {
                type: "string",
                required: true,
            },
            STATE: {
                type: "string",
            },
            COUNTRY: {
                type: "string",
                required: true,
            },
        },
    },
    Airline: {
        type: "object",
        properties: {
            IATA_CODE: {
                type: "string",
                required: true,
            },
            AIRLINE: {
                type: "string",
                required: true,
            },
        },
    },
};

// API general specs
const general_specs = {
    info: {
        title: "Watson Airlines Customer Experience",
        description:
            "This is a REST API for the Watson Airlines Customer Experience.",
        contact: {
            name: "Mauricio Badano",
            email: "mauriciobadano@gmail.com",
        },
        version: "1.0.0",
    },
    servers: [
        {
            url: "https://localhost:8080",
            description: "Local Server",
        },
        {
            url: "https://final.14r9zp2vmz3m.us-south.codeengine.appdomain.cloud/",
            description: "IBM Code Engine Deployment",
        },
    ],
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    security: [],
    components: {
        schemas: mongo_specs,
    },
    paths: {
        "/airlines": {
            get: {
                summary: "Get every Airline",
                description: "Retrieve every listed airline",
                responses: {
                    "200": {
                        description: "Successful operation",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Airline",
                                },
                            },
                        },
                    },
                    "404": {
                        description: "Not found",
                    },
                },
            },
        },
        "/watsonairlines": {
            get: {
                summary: "Get Watson Airlines Info",
                description: "Retrieve Information about Watson Airlines",
                responses: {
                    "200": {
                        description: "Successful operation",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "string",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/flightsod/{originId}/{destinationId}": {
            get: {
                summary: "Get flight through origin and destination",
                description: "Get flights based on user-defined origin and destination",
                parameters: [
                    {
                        name: "originId",
                        in: "path",
                        description: "ID of the origin airport",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                    {
                        name: "destinationId",
                        in: "path",
                        description: "ID of the destination airport",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    "200": {
                        description: "Successful operation",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Flight",
                                },
                            },
                        },
                    },
                    "404": {
                        description: "Not found",
                    },
                },
            },
        },
        "/flightsda/{date}/{airline}": {
            get: {
                summary: "Get flight through date and airline",
                description: "Get flights based on user-defined date and airline",
                parameters: [
                    {
                        name: "date",
                        in: "path",
                        description: "Date of the flight (e.g., YYYY-MM-DD)",
                        required: true,
                        schema: {
                            type: "string",
                            format: "date",
                        },
                    },
                    {
                        name: "airline",
                        in: "path",
                        description: "ID of the airline",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    "200": {
                        description: "Successful operation",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Flight",
                                },
                            },
                        },
                    },
                    "404": {
                        description: "Not found",
                    },
                },
            },
        },
        "/flightsid/{id}": {
            get: {
                summary: "Get flight through id",
                description: "Retrieve a specific flight through the object ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "ID of the flight",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    "200": {
                        description: "Successful operation",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Flight",
                                },
                            },
                        },
                    },
                    "404": {
                        description: "Not found",
                    },
                },
            },
        },
    },
};

// API Routes
// NOTE: If using Express Router, pass only the root file where the route starts.
const api_routes = [
    "./app.js",
    "./flightsController.js",
    "./airlinesController.js",
];

// Output file path
const output_file_path = "./openapi-spec.json";

// Generate OpenAPI spec
swagger_autogen(
    (outputFile = output_file_path),
    (endpointsFiles = api_routes),
    (data = general_specs)
);