const express = require("express");
const defaultMetricsRoute = require("./metrics/defaultMetrics");
const utils = require("./utils")

const app = express();
const port = 7001;

const maxIterador = 1000;
const temporizador = 500;
const tamanhoArray = 100;

defaultMetricsRoute.setMetricsRoute(app);

app.listen(port, () => {
  console.log(`Exporter do Prometheus está rodando na porta ${port}`);
});

function preencheArrayLocal() {
  var data = [];
  for (let i = 0; i < maxIterador; i++) {
    data.push(new Array(tamanhoArray).join("x"));
  }
  
  console.log("Tamanho da array: " + data.length);
  console.log(
    "Memoria alocada:",
    process.memoryUsage().heapUsed / 1024 / 1024,
    "MB"
  );
}

function preencheArrayGlobal() {
  for (let i = 0; i < maxIterador; i++) {
    data.push(new Array(tamanhoArray).join("x"));
  }
  utils.delay(7000);
  console.log("Tamanho da array: " + data.length);
  console.log("Memoria alocada:", process.memoryUsage().heapUsed / 1024 / 1024, "MB");
}

var data = [];
function memoryLeak() {
  setInterval(preencheArrayGlobal, temporizador);
}

memoryLeak();
