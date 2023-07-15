const turf = require("@turf/turf");
const lines = require("../lines.json");

// Middleware for request logging
module.exports.requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// Middleware for error handling
module.exports.errorHandler = (err, req, res, next) => {
  console.error("errorHandler", err.message);
  res.status(500).json({ error: "Internal server error" });
};

// Middleware for header-based authentication
module.exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the API key is valid
  if (!authHeader || authHeader !== "Bearer your-auth-token") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // API key is valid, proceed to the next middleware
  next();
};

// Controller function to handle the /intersections endpoint
module.exports.intersections = function (req, res, next) {
  try {
    const linestring = { ...req.body };

    // Check if the request body contains a valid linestring
    if (
      !linestring ||
      !Array.isArray(linestring.coordinates) ||
      linestring.coordinates.length < 2
    ) {
      return res.status(400).json({
        error: "Invalid linestring provided",
      });
    }

    // Convert the linestring GeoJSON to a turf.js LineString
    const turfLinestring = turf.lineString(linestring.coordinates);

    // Find intersections with the given lines
    const intersections = [];
    for (const line of lines) {
      const lineString = turf.lineString([line.start, line.end]);
      if (turf.lineIntersect(turfLinestring, lineString).features.length > 0) {
        intersections.push({
          id: line.id,
          intersection: turf.lineIntersect(turfLinestring, lineString)
            .features[0].geometry.coordinates,
        });
      }
    }
    if (intersections.length === 0) {
      return res.json([]);
    }
    return res.json(intersections);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};
