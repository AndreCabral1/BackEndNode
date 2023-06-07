const express = require("express");
const userRouter = require("./rotas/user");
const receitaRouter = require("./rotas/receita");

const server = express();

server.use(express.json());

server.use(userRouter);
server.use(receitaRouter);

module.exports = server;