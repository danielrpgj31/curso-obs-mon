const { builtinModules } = require("module");
const { PerformanceObserver } = require("perf_hooks");

let gcStatistics = {
  type: "",
  diffGCTime: 0,
  gcPercentil: 0,
  lastStartTime: 0,
  gcDuration: 0,
};

let manageGcCounter = null;

// Create a performance observer
const obs = new PerformanceObserver((list) => {
  gc_event_callback(list);
});

function gc_event_callback(list) {
  const entry = list.getEntries()[0];
  updateStatistics(entry);
  console.log(`########## Evento GC ${JSON.stringify(gcStatistics)}`);
}


function updateStatistics(entry) {
  if (entry.entryType == "gc") {

    gcStatistics.type = "gc";

    //Variavel de calculo
    let atualGCStartTime = entry.startTime;
    let gcPercentil = 0;

    //Calculos
    gcStatistics.gcDuration = entry.duration;
    gcStatistics.diffGCTime = gcStatistics.lastStartTime > 0 ? atualGCStartTime - gcStatistics.lastStartTime : 0;

    if (gcStatistics.diffGCTime > 0) {
      gcPercentil = (gcStatistics.gcDuration / gcStatistics.diffGCTime) * 100;
      gcStatistics.gcPercentil = gcPercentil;
    }

    //Variavel de calculo
    gcStatistics.lastStartTime = entry.startTime;

    //Atualiza metrica prometheus gc25counter, apenas se gcPercentil > 25%
    if(gcStatistics.gcPercentil > 25)
      manageGcCounter.IncGc25Counter();
  }
}

function observe(gcCounter) {
  // Subscribe to notifications of GCs
  obs.observe({ entryTypes: ["gc"] });
  // Registrar nova metrica de estatistica
  manageGcCounter = gcCounter;
}

function disconnect() {
  // Stop subscription
  obs.disconnect();
}

module.exports = { observe, disconnect };
