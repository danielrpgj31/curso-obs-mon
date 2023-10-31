const client = require("prom-client");
const gcMetrics = require("./gcMetrics");

// Create a Registry to register the metrics
const register = new client.Registry();

gcMetrics.registerGCMetrics(client, register);

function setMetricsRoute(app) {
  app.get("/metrics", async (req, res) => {
    res.setHeader("Content-Type", register.contentType);
    res.send(await register.metrics());
  });
}

module.exports = { setMetricsRoute };
