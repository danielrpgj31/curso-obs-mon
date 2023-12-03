function registerGCMetrics(client, register) {
  // Create a Registry to register the metrics
  client.collectDefaultMetrics({
    app: "node-application-monitoring-app",
    prefix: "hook_",
    timeout: 10000,
    gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
    register,
  });
}

module.exports = { registerGCMetrics };
