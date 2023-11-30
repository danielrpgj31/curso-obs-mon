const { builtinModules } = require("module");
const { PerformanceObserver } = require("perf_hooks");
const { InitGc25Counter, IncGc25Counter } = require("./manageGcCounter");

let gcStatistics = {
  type: "",
  diffGCTime: 0,
  gcPercentil: 0,
  lastStartTime: 0,
  gcDuration: 0,
  qtd25: 0.0,
  qtd50: 0.0,
  qtd75: 0.0,
  qtd100: 0.0,
};

function updateStatistics(entry) {
  if (entry.entryType == "gc") {
    let diffGCTimeEvent = 0;
    //Variavel de calculo
    let atualGCStartTime = entry.startTime;
    let gcPercentil = 0;

    //Calculos
    gcStatistics.gcDuration = entry.duration;

    diffGCTimeEvent =
      gcStatistics.lastStartTime > 0
        ? atualGCStartTime - gcStatistics.lastStartTime
        : 0;

    if (diffGCTimeEvent > 0) {
      gcPercentil = (gcStatistics.gcDuration / diffGCTimeEvent) * 100;
      //update estatisticas em objeto global
      gcStatistics.type = "gc";
      gcStatistics.diffGCTime = diffGCTimeEvent;
      gcStatistics.gcPercentil = gcPercentil;
    }

    //Variavel de calculo
    gcStatistics.lastStartTime = entry.startTime;

    //TODO Atualiza metrica prometheus

  }
}

// Create a performance observer
const obs = new PerformanceObserver((list) => {
  const entry = list.getEntries()[0];

  updateStatistics(entry);

  console.log(`########## Evento GC ${JSON.stringify(gcStatistics)}`);
});

function observe() {
  // Subscribe to notifications of GCs
  obs.observe({ entryTypes: ["gc"] });
  // Registrar nova metrica de estatistica
  
}

function disconnect() {
  // Stop subscription
  obs.disconnect();
}

module.exports = { observe, disconnect };
