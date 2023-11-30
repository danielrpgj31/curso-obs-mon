const { builtinModules } = require("module");
const { PerformanceObserver } = require("perf_hooks");

let gcStatistics = {
  type: "",
  qtd25: 0.0,
  qtd50: 0.0,
  qtd75: 0.0,
  qtd100: 0.0,
};

// Create a performance observer
const obs = new PerformanceObserver((list) => {
  const entry = list.getEntries()[0];

  //Distribui os tipos
  switch (entry.entryType) {
    case "gc":
      gcStatistics.type = "gc";
      gcStatistics.qtd100++;
      break;
    default:
      break;
  }

  console.log(
    `evento type:${gcStatistics.type}, qtd100: ${gcStatistics.qtd100}`
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
