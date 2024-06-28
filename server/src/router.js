/**
 * @fileoverview Router for the server.
 * 
 * This file is responsible for routing requests to the appropriate controller.
 * It is imported into and run in the server.js file.
 * 
 * Separating the routing logic from the controller makes the code more modular,
 * easier to read, and easier to test.
 */
const express = require("express");
const controller = require("./controllers/controller.js");
const middleware = require("./middleware/middleware.js");

const router = express.Router();

/** General routes */
router.get("/api", middleware.logMessage, controller.index);

/** User routes */
router.get("/api/users", controller.getUsers);
router.get("/api/users/:id", controller.getUser);
router.post("/api/users", controller.createUser);
router.put("/api/users/:id", controller.updateUser);
router.delete("/api/users/:id", controller.deleteUser);

module.exports = router;
