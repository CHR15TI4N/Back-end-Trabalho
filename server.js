const express = require("express");
const healthRoutes = require("./routes/health");

const server = express();
server.use(express.json())

server.use(healthRoutes.router);

module.exports = {server};