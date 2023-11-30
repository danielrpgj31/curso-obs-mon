const { builtinModules } = require("module");
const { PerformanceObserver } = require("perf_hooks");

let gcStatistics = {
  type: "",
  diffGCTime: 0,
  qtd25: 0.0,
  qtd50: 0.0,
  qtd75: 0.0,
  qtd100: 0.0,
};

let lastStartTime = 0;
let diffGCTimeEvent = 0;

// Create a performance observer
const obs = new PerformanceObserver((list) => {
  const entry = list.getEntries()[0];

  if (entry.entryType == "gc") {
    let atualGCStartTime = entry.startTime;
    diffGCTimeEvent = lastStartTime > 0 ? atualGCStartTime - lastStartTime : 0;
    gcStatistics.diffGCTime = diffGCTimeEvent;
    lastStartTime = entry.startTime;
  }

  console.log(
    `evento type:${gcStatistics.type}, diffGCTime: ${gcStatistics.diffGCTime}`
  );
});

function observe() {
  // Subscribe to notifications of GCs
  obs.observe({ entryTypes: ["gc"] });
}

function disconnect() {
  // Stop subscription
  obs.disconnect();
}

module.exports = { observe, disconnect };
