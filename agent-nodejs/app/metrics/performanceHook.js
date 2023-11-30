const { builtinModules } = require("module");
const { PerformanceObserver } = require("perf_hooks");

// Create a performance observer
const obs = new PerformanceObserver((list) => {
  const entry = list.getEntries()[0];
  /*
  The entry is an instance of PerformanceEntry containing
  metrics of a single garbage collection event.
  For example:
  PerformanceEntry {
    name: 'gc',
    entryType: 'gc',
    startTime: 2820.567669,
    duration: 1.315709,
    kind: 1
  }
  */

  console.log(
    `evento gc name:${entry.name}, duration:${entry.duration}, startTime:${entry.startTime}, kind:${entry.detail.kind}`
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
