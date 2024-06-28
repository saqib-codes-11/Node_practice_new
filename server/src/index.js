/**
 * @fileoverview Entry point for the server.
 *
 * This file is responsible for starting the server and connecting to the database.
 */
const server = require("./server.js");
const db = require("./database.js");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

/** Initialize database connection */
db.connectToDatabase();

/** Start server */
server.listen(PORT, HOST, () => {
  let host = HOST === "0.0.0.0" ? "localhost" : HOST;
  console.log(`Server listening on http://${host}:${PORT}`);
});
