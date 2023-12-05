const client = require("prom-client");
const performanceHook = require("./performanceHook");
const manageGcCounter = require("./manageGcCounter");
const throughputMetric = require("./throughputMetric")
const gcMetrics = require("./gcMetrics");

// create a Registry to register the metrics
const register = new client.Registry();

// criacao de metrica estatistica especifica
manageGcCounter.initGc25Counter(client, register);

// coleta de varias metricas de GC
gcMetrics.registerGCMetrics(client, register);

// coleta de estatisticas de GC especifícas
performanceHook.observe(manageGcCounter);

// coleta de throughput
throughputMetric.initThroughputApiCostumerGauge(client, register);

function setMetricsRoute(app) {
  app.get("/metrics", async (req, res) => {
    res.setHeader("Content-Type", register.contentType);
    res.send(await register.metrics());
  });
}

function incThroughputValue() {
  throughputMetric.incThroughputApiCostumerGauge();
}

module.exports = { setMetricsRoute, incThroughputValue };
