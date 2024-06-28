/**
 * @fileoverview Server configuration.
 * 
 * This file is responsible for configuring the server. Keeping
 * the server configuration in a separate file makes the code
 * easier to read and test.
 */
const express = require("express");
const path = require("path");
const router = require("./router.js");
const cors = require("cors");

/** Express middleware */
const server = express();
server.use(express.json());
server.use(express.static(path.resolve(__dirname, "../../client/dist")));
server.use(express.urlencoded({ extended: true }));
server.use(cors());

/** Routes */
server.use(router);

/** Pass all unhandled routes to React */
server.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../client/dist", "index.html"));
});

module.exports = server;
