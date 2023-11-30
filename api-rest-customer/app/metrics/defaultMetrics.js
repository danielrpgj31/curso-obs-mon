const client = require("prom-client");
const performanceHook = require("./performanceHook");
const manageGcCounter = require("./manageGcCounter");
const gcMetrics = require("./gcMetrics");


// Create a Registry to register the metrics
const register = new client.Registry();

// Coleta de metrica estatistica especifica
manageGcCounter.InitGc25Counter(client, register);

// Coleta de varias metricas de GC
gcMetrics.registerGCMetrics(client, register);

//Coleta de estatisticas de GC especifícas
performanceHook.observe();

function setMetricsRoute(app) {
  app.get("/metrics", async (req, res) => {
    res.setHeader("Content-Type", register.contentType);
    res.send(await register.metrics());
  });
}

module.exports = { setMetricsRoute };
