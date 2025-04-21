import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const router = Router();

// Swagger configuration
const swaggerOptions = {
  apis: ["./src/api/controllers/**/*.ts"], // Path to the API routes/controllers
  swaggerDefinition: {
    info: {
      description: "API documentation generated with Swagger",
      title: "NC NEWS API Documentation",
      version: "1.0.0",
    },
    openapi: "3.0.0",
    servers: [
      {
        description: "Development server",
        url: "http://localhost:8000",
      },
      {
        description: "Production server",
        url: "https://ts-be-nc-news-jsmapzdgsq-nw.a.run.app",
      },
    ],
  },
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
