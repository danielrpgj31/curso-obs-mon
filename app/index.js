const express = require("express");
const defaultMetricsRoute = require("./metrics/defaultMetrics");

const app = express();
const port = 8080;

const maxIterador = 10000;
const temporizador = 5000;
const data = [];
const tamanhoArray = 10000;

defaultMetricsRoute.setMetricsRoute(app);

app.listen(port, () => {
  console.log(`Exporter do Prometheus está rodando na porta ${port}`);
});

/*
setInterval(() => {
  for (let i = 0; i < maxIterador; i++) {
    data.push(new Array(tamanhoArray).join("x"));
    console.log("Memoria alocada...");
  }
}, temporizador);
*/
