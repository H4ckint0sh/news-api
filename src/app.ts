import routes from "#api/routes/index.js";
import { errorHandling } from "#middleware/error-handling.js";
import swaggerRouter from "#swagger.js";
import cors from "cors";
import express, { Application } from "express";

const app: Application = express();

// * Swagger
app.use(swaggerRouter);

// * Tech endpoints
app.use(cors());
app.use(express.json());

// * Routes
app.use("/api", routes);

// * Custom Error Handler
app.use(errorHandling);

export default app;
