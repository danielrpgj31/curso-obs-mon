const client = require("prom-client");
let throughputApiCostumerGauge = null;
let apiCallsCount = 0;
let tempoInicial = Date.now();
let tempoFim = 0;

function initThroughputApiCostumerGauge(client, register) {
  throughputApiCostumerGauge = new client.Gauge({
    name: "throughputApiCostumerGauge",
    help: "Throughput da Api de Customer. Em Requisições/Minuto",
  });

  register.registerMetric(throughputApiCostumerGauge);
}

function incThroughputApiCostumerGauge() {
  var diffTempo = 0;
  var throughput = 0;

  apiCallsCount++;
  diffTempo = (Date.now() - tempoInicial)/1000;
  throughput = apiCallsCount / diffTempo;
    
  throughputApiCostumerGauge.set(throughput);

}

module.exports = {
  initThroughputApiCostumerGauge,
  incThroughputApiCostumerGauge,
};
