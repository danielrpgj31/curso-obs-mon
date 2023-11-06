const express = require("express");
const defaultMetricsRoute = require("./metrics/defaultMetrics");

const app = express();
const port = 8081;

const maxIterador = 1000;
const temporizador = 5000;
const tamanhoArray = 1000;

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

function preencheArrayGlobal(data) {
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

function memoryLeak() {
  var data = [];
  setInterval(preencheArrayLocal, temporizador);
}

memoryLeak();
