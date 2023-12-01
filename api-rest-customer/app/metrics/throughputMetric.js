const client = require("prom-client");
let throughputApiCostumerGauge = null;
let throughput = 0;
let tempoInicial = Date.now;

function InitThroughputApiCostumerGauge(client, register) {

    throughputApiCostumerGauge = new client.Gauge({
        name: 'throughputApiCostumerGauge',
        help: 'Throughput da Api de Customer. Em Requisições/Minuto'
      });
    
    register.registerMetric(throughputApiCostumerGauge);
  
}
  
function IncThroughputApiCostumerGauge() {

    if (tempoFim == undefined) {
        tempoFim = Date.now;
    }
    diffTempo = tempoFim - tempoInicial;
    
    throughputApiCostumerGauge.set(throughput);

}

module.exports = {InitThroughputApiCostumerGauge, IncThroughputApiCostumerGauge};
