const express = require("express");
const transactions = express.Router();
const transactionArr = require("../models/transactionData");
transactions.use(express.json());

//ROUTES
//=========> READ/INDEX
transactions.get("/", (req, res, next) => {
  try {
    if (transactionArr && transactionArr.length > 0) {
      res.status(200).send(transactionArr);
    } else {
      res.status(420).send({ message: "Transactions were not found" });
    }
  } catch (error) {
    next(error);
  }
});
//=========> SHOW/(BY ID)

transactions.get("/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const targetTransaction = transactionArr.find(
      trans => trans.id === parseInt(id)
    );
    if (targetTransaction) {
      res.status(200).send(targetTransaction);
    } else {
      res.status(404).send({ message: "Couldn't find it boo" });
    }
  } catch (error) {
    next(error);
  }
});

//=========> CREATE/PUT

transactions.put("/:id", (req, res, next) => {
  try {
    const transactionId = parseInt(req.params.id);
    const transactionUpdate = req.body;
    const transIndex = transactionArr.findIndex(trans => trans.id === transactionId);

    if (transIndex === -1) {
      res.status(404).send({ message: "transaction not found" });
    }

    const currentTransaction = transactionArr[transIndex];

    for (let key in transactionUpdate) {
      if (currentTransaction.hasOwnProperty([key])) {
        currentTransaction[key] = transactionUpdate[key];
      }
    }

    transactionArr[transIndex] = currentTransaction;
    res.send(currentTransaction);
  } catch (error) {
    next(error);
  }
});

// DELETE an item by ID

transactions.delete("/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const transIndex = transactionArr.findIndex((trans) => trans.id === id);

    if (transIndex === -1) {
      return res.status(404).send({ message: "Item not found" });
    }

    const deletedItem = transactionArr.splice(transIndex, 1);

    res.send(deletedItem[0]);
  } catch (error) {
    next(error);
  }
});


module.exports = transactions