const express = require("express");
const router = express.Router();
const controller = require("../controllers/index");

// Define the route for the /intersections endpoint
router.post(
  "/intersections",
  controller.authenticate,
  controller.intersections
);

module.exports = router;
