const express = require("express");
const serviceDb = require("./service");

const app = express();
const port = 3000;

// Dados para inserção em lote
const dataToInsert = [
  { name: "Item 1", price: 10 },
  { name: "Item 2", price: 20 },
  { name: "Item 3", price: 30 },
];

serviceDb.AddPrice(dataToInsert);
