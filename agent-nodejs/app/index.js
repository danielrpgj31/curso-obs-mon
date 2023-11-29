// Uso: node index.js caminho/do/arquivo.txt
// Exemplo: node index.js dados.txt
const filePath = process.argv[2];

if (!filePath) {
  console.error("Informe o caminho do arquivo e as posições dos campos.");
  process.exit(1);
}

const db = require("./service/db");
const readAndPersistFile = require("./service/file");
const dbInstance = new db.DbTrace();

//1 Persistencia do arquivo em uma tabela mysql
readAndPersistFile.persistGcTraceToDb(filePath, dbInstance);

//2 Calculo 1: tempo (ms) de GC entre um evento e o próximo do mesmo tipo
dbInstance.runCalcGcStatistics();

//
dbInstance.closeDb();
