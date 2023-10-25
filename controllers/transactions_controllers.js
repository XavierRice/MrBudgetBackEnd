const express = require("express");
const transactions = express.Router();
const transactionsArr = require("../models/transactionsData");
const {
  NameAlphabetSort,
  MoneySort,
  checkForTransactionEditKey,
} = require("../helpers/transactionsHelpers.js");

transactions.use(express.json());

//ROUTES
//=========> READ/INDEX
transactions.get("/", (req, res, next) => {
  const { name, amount:amountStirng } = req.query;
  const amount = parseFloat(amountStirng)

  let response = transactionsArr.slice();
  try {
    if (name) {
      response = NameAlphabetSort(response, name);
      console.log(response);
    } else if (amount) {
      response = MoneySort(response, amount , amount);
      console.log(response);
    }
    if (response && response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(420).send({ message: "Transactions were not found" });
    }
  } catch (error) {
    next(error);
  }
});
//=========> SHOW/(ID)

transactions.get("/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const targetTransaction = transactionsArr.find(
      (trans) => trans.id === parseInt(id)
    );
    if (targetTransaction) {
      console.log(targetTransaction);
      res.status(200).json(targetTransaction);
    } else {
      res.status(404).send({ message: "Couldn't find it boo" });
    }
  } catch (error) {
    next(error);
  }
});

//=========> CREATE/UPDATE

transactions.put("/:id", (req, res, next) => {
  try {
    const transactionId = parseInt(req.params.id);
    const transactionUpdate = req.body;
    const transIndex = transactionsArr.findIndex(
      (trans) => trans.id === transactionId
    );

    if (transIndex === -1) {
      console.log(transactionId);
      res.status(404).send({ message: "transaction not found" });
    }
    const currentTransaction = transactionsArr[transIndex];

    for (let key in transactionUpdate) {
      if (currentTransaction.hasOwnProperty(key)) {
        currentTransaction[key] = transactionUpdate[key];
      }
    }

    transactionsArr[transIndex] = currentTransaction;
    res.json(currentTransaction);
  } catch (error) {
    next(error);
  }
});
//=========> CREATE/UPDATE

transactions.post("/", (req, res, next) => {
  try {
    const transactionObj = req.body;
    if (transactionObj) {
      transactionsArr.push(transactionObj);
      console.log(transactionObj);
      res.status(201).send(transactionObj);
    } else {
      res.status(404).json({ message: "Transaction not created" });
    }
  } catch {
    console.error(error);
    next(error);
  }
});

// DELETE an item by ID

transactions.delete("/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const transIndex = transactionsArr.findIndex((trans) => trans.id === id);

    if (transIndex === -1) {
      return res.status(404).send({ message: "Item not found" });
    } else {
      const deletedItem = transactionsArr.splice(transIndex, 1);
      res.status(200).json(deletedItem[0]);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = transactions;
