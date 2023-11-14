const fs = require("fs");
const mysql = require("mysql2");

class FileProcessor {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
    this.createTable();
  }

  createTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS dados (
        id INT AUTO_INCREMENT PRIMARY KEY,
        campo1 VARCHAR(255),
        campo2 VARCHAR(255)
        -- Adicione mais campos conforme necessário
      );
    `;

    this.connection.query(createTableQuery, (err) => {
      if (err) throw err;
      console.log("Tabela criada ou já existe.");
    });
  }

  readFileAndInsertData(filePath, fileStruct) {
    const stream = fs.createReadStream(filePath);
    stream.on("data", (chunk) => {
      const lines = chunk.toString().split("\n");

      lines.forEach((line) => {
        let dataLine = [];

        //1. Percorre cada coluna do fileStruct e busca na linha lida do arquivo a informacao
        //2. Adiciona a informacao extraida da linha no formato dataLine[info1, info2, info3, etc]
        Object.keys(fileStruct).forEach((coluna) => {
          const columnData = fileStruct[coluna];
          var data = [];
          //Recupera dados da linha
          switch (columnData.tipo) {
            case "pattern": {
              data = line
                .substring(
                  line.indexOf(columnData.pattern1),
                  line.indexOf(
                    columnData.pattern2,
                    line.indexOf(columnData.pattern1)
                  )
                )
                .trim();
            }
          }

          //Preenche dataLine usado no SQL
          dataLine.push(data);
        });

        console.log(`Dataline: ${dataLine}`);

        const insertQuery = `
          INSERT INTO dados (campo1, campo2)
          VALUES (?, ?)
        `;

        this.connection.query(insertQuery, dataLine, (err) => {
          if (err) throw err;
          console.log("Dados inseridos com sucesso.");
        });
      });
    });

    stream.on("end", () => {
      this.connection.end();
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
};

const dbConfig = {
  host: "localhost",
  user: "myuser",
  password: "mypassword",
  database: "mydatabase",
};

function gcFilePersisteDb() {
  const processor = new FileProcessor(dbConfig);
  processor.readFileAndInsertData(filePath, fileStruct);
}

module.exports = { gcFilePersisteDb };
