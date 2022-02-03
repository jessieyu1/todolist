const swaggerJsDoc = require("swagger-jsdoc");
//const path = require("path");

module.exports = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "to-do list",
      version: "1.0.0",
      description: "to-do list api",
      contact: {
        name: "jessie",
        email: "******@gmail.com",
      },
    },
  },
  apis: ["controllers/*.js"],
});
