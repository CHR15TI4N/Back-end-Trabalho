const express = require("express");
const healthRoutes = require("./routes/health");
const receitasRoutes = require("./routes/receitas");

const server = express();
server.use(express.json())

server.use(healthRoutes.router);
server.use(receitasRoutes.router);

module.exports = {server};