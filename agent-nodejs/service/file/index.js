const fs = require("fs");
const db = require("../db");

class FileProcessor {
  readFileAndInsertData(filePath, fileStruct) {
    const stream = fs.createReadStream(filePath, {
      highWaterMark: 1024 * 1024,
    });
    const persistenceTrace = new db.PersistenceTraceGc();

    stream.on("data", (chunk) => {
      const lines = chunk.toString().split("\n");

      lines.forEach((line) => {
        if (line.trim().length > 0) {
          var dataLine = [];

          //1. Percorre cada coluna do fileStruct e busca na linha lida do arquivo a informacao
          //2. Adiciona a informacao extraida da linha no formato dataLine[info1, info2, info3, etc]
          Object.keys(fileStruct).forEach((coluna) => {
            const columnData = fileStruct[coluna];
            var data = [];

            //Recupera dados da linha
            switch (columnData.tipo) {
              case "pattern": {
                if (line.indexOf(columnData.pattern1) > -1) {
                  var index1 =
                    line.indexOf(columnData.pattern1) +
                    columnData.pattern1.length;
                  var index2 = line.indexOf(columnData.pattern2, index1);
                  data = line.substring(index1, index2).trim();
                }
              }
            }

            //Preenche dataLine usado no SQL
            if (data.length > 0) dataLine.push(data);
          });

          try {
            console.log(`Inserindo dados processados: ${dataLine}`);
            persistenceTrace.persistTrace(dataLine);
          } catch (err) {
            console.log(
              `Ocorreu um erro com a persistencia da linha ${dataLine}. Continuando..`
            );
          }
        }
      });
    });

    stream.on("error", (err) => {
      if (err) throw err;
    });

    stream.on("end", () => {
      persistenceTrace.closeDb();
    });
  }
}

// Uso: node index.js caminho/do/arquivo.txt
// Exemplo: node index.js dados.txt
const filePath = process.argv[2];

if (!filePath) {
  console.error("Informe o caminho do arquivo e as posições dos campos.");
  process.exit(1);
}

const fileStruct = {
  gcType: {
    tipo: "pattern",
    pattern1: "ms: ",
    pattern2: " ",
  },
  timegc: {
    tipo: "pattern",
    pattern1: "MB, ",
    pattern2: "/",
  },
  heap1a: {
    tipo: "pattern",
    pattern1: "Scavenge ",
    pattern2: "(",
  },
  heap1b: {
    tipo: "pattern",
    pattern1: "Mark-sweep ",
    pattern2: "(",
  },
  heap2: {
    tipo: "pattern",
    pattern1: "->",
    pattern2: "(",
  },
  timestamp: {
    tipo: "pattern",
    pattern1: "]",
    pattern2: "ms:",
  },
};

function gcFilePersisteDb() {
  const processor = new FileProcessor();
  processor.readFileAndInsertData(filePath, fileStruct);
}

module.exports = { gcFilePersisteDb };
