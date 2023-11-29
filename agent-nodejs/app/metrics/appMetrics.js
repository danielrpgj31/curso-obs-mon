const client = require("prom-client");
const gcMetrics = require("./gcMetrics");

// Create a Registry to register the metrics
const register = new client.Registry();

const gc25counter = new client.Counter({
  name: "gc25counter",
  help: "Uma métrica que identifica quantos eventos de GC ocorreram cujo do tempo seja entre 25% a 50% do intervalo de tempo entre o ultimo gc.",
  labelNames: ["tipo"],
});

for (let i = 0; i < 400; i++) {
  gc25counter.inc({ tipo: "gc25counter" });
}

register.registerMetric(gc25counter);
gcMetrics.registerGCMetrics(client, register);

function setMetricsRoute(app) {
  app.get("/metrics", async (req, res) => {
    res.setHeader("Content-Type", register.contentType);
    res.send(await register.metrics());
  });
}

module.exports = { setMetricsRoute };
