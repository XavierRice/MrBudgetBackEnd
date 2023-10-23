//DEPENDENCIES
const express = require("express");
const app = express();
const cors = require("cors");

//CONTROLLERS
const transactionsController = require("./controllers/transactions_controllers");

//Middleware:
app.use(cors());
app.use(express.json());
app.use("/transactions", transactionsController);

app.use((req, res) => {
  console.log(req.method, req.headers.host, req.path);
});

//ROUTES

app.get("/", (req, res) => {
  res.status(200).send("welcome to the Budgeter");
});

app.get("*", (req, res) => {
  res.status(404).json({ error: "me no work here" });
});

module.exports = app;
