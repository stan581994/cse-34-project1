const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "This is a simple CRUD API application for the contacts",
  },
  host: "localhost:3000",
  schemes: ["https", "http"],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./routes/index.js"];

//this will generate swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc);
