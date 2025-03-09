const os = require("os");
const fs = require("fs/promises");
const express = require("express");
const defaultMetricsRoute = require("./metrics/defaultMetrics");

const app = express();
const port = 8081;

let len = 1_000_000;
const fileName = `entries-${Date.now()}`;

defaultMetricsRoute.setMetricsRoute(app);

app.listen(port, () => {
  console.log(`Exporter do Prometheus está rodando na porta ${port}`);
});

async function addEntry() {
  const entry = {
    timestamp: Date.now(),
    memory: os.freemem(),
    totalMemory: os.totalmem(),
    uptime: os.uptime(),
  };
  await fs.appendFile(fileName, JSON.stringify(entry) + "\n");
}

async function summary() {
  const stats = await fs.lstat(fileName);
  console.log(`File size ${stats.size} bytes`);
}

// execution
(async () => {
  await fs.writeFile(fileName, "----START---\n");
  while (len > 0) {
    await addEntry();
    //process.stdout.write(`~~> ${len} entries to record\r`);
    len--;
  }
  await summary();
})();
