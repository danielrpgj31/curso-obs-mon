const express = require("express");
const client = require("prom-client");

const app = express();
const port = 3000;

// Create a Registry to register the metrics
const register = new client.Registry();

app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", register.contentType);
  res.send(await register.metrics());
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
