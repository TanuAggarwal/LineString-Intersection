const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const env = require("dotenv").config();
const port = process.env.PORT || 3333;

// Middleware
app.use(bodyParser.json({ limit: "10mb" }));
const route = require("./routes");
const { requestLogger, errorHandler } = require("./controllers");

// Add the request logger middleware before your routes
app.use(requestLogger);

// Routes
app.use("/api", route);

// Add the error-handling middleware after your routes
app.use(errorHandler);

// Start the server
app.listen(port);
