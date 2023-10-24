const transactionsArr = require("../controllers/transactions_controllers");

function NameAlphabetSort(response, direction) {
  if (direction === "asc") {
    const ascSort = response.sort((a, b) =>
      a.transaction_name.localeCompare(b.transaction_name, "en", {
        sensitivity: "case",
      })
    );
    return ascSort;
  } else if (direction === "desc") {
    const descSort = response.sort((a, b) =>
      b.transaction_name.localeCompare(a.transaction_name, "en", {
        sensitivity: "case",
      })
    );
    return descSort;
  } else {
    return "Error in function";
  }
}

function MoneySort(response, selection, amount) {
  let sortedTransactions;

  if (selection === "gt") {
    sortedTransactions = response.filter(
      (transaction) => transaction.amount > amount
    );
  } else if (selection === "gte") {
    sortedTransactions = response.filter(
      (transaction) => transaction.amount >= amount
    );
  } else if (selection === "lt") {
    sortedTransactions = response.filter(
      (transaction) => transaction.amount < amount
    );
  } else if (selection === "lte") {
    sortedTransactions = response.filter(
      (transaction) => transaction.amount <= amount
    );
  } else {
    consolen.log("Error");
  }
  return sortedTransactions;
}

function checkForTransactionEditKey(req, res, next) {
  console.log(req.body);

  let vaild = ( //typeof operator returns the varitey of the value associated with it
    (req.body.hasOwnProperty("id") && typeof req.body.id === "number") ||
    (req.body.hasOwnProperty("transaction_name") && typeof req.body.transaction_name === "string") ||
    (req.body.hasOwnProperty("amount") && typeof req.body.amount === "number") ||
    (req.body.hasOwnProperty("from") && typeof req.body.from === "string") ||
    (req.body.hasOwnProperty("catagory") &&
      typeof req.body.catagory === "string")
  )
  if (vaild) {
    return next();
  } else {
    res.send(`invalid object. Please check yo self ${req.body}`);
  }
}

module.exports = {

    NameAlphabetSort, 
    MoneySort,
    checkForTransactionEditKey
}