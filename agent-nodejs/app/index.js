// Uso: node index.js caminho/do/arquivo.txt
// Exemplo: node index.js dados.txt
const filePath = process.argv[2];

if (!filePath) {
  console.error("Informe o caminho do arquivo e as posições dos campos.");
  process.exit(1);
}

const persistenceGcFile = require("./service/file");
persistenceGcFile.gcFilePersisteToDb(filePath);
