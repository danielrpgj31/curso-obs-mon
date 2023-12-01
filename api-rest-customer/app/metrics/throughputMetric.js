const client = require("prom-client");
let throughputApiCostumerGauge = null;
let throughput = 0;
let tempoInicial = Date.now();
let tempoFim = 0;

function InitThroughputApiCostumerGauge(client, register) {
  throughputApiCostumerGauge = new client.Gauge({
    name: "throughputApiCostumerGauge",
    help: "Throughput da Api de Customer. Em Requisições/Minuto",
  });

  register.registerMetric(throughputApiCostumerGauge);
}

function IncThroughputApiCostumerGauge() {
  var diffTempo = 0;

  if (tempoFim == 0) {
    tempoFim = Date.now();
  } else {
    diffTempo = Date.now() - tempoInicial;
  }
}

module.exports = {
  InitThroughputApiCostumerGauge,
  IncThroughputApiCostumerGauge,
};
