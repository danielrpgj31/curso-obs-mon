const fs = require('fs');
const mysql = require('mysql2');

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
        campo2 VARCHAR(255),
        campo3 VARCHAR(255)
        -- Adicione mais campos conforme necessário
      );
    `;

    this.connection.query(createTableQuery, (err) => {
      if (err) throw err;
      console.log('Tabela criada ou já existe.');
    });
  }

  readFileAndInsertData(filePath, fileStruct) {
    const stream = fs.createReadStream(filePath);

    stream.on('data', (chunk) => {
      const lines = chunk.toString().split('\n');
      lines.forEach((line) => {
        const data = fieldPositions.map((position) => line.slice(position.start, position.end).trim());
        
        const insertQuery = `
          INSERT INTO dados (campo1, campo2, campo3)
          VALUES (?, ?, ?)
        `;

        this.connection.query(insertQuery, data, (err) => {
          if (err) throw err;
          console.log('Dados inseridos com sucesso.');
        });
      });
    });

    stream.on('end', () => {
      this.connection.end();
    });
  }
}

// Uso: node index.js caminho/do/arquivo.txt "0-4,5-9,10-14"
// Exemplo: node index.js dados.txt "0-4,5-9,10-14"
const filePath = process.argv[2];
const fieldPositionsInput = process.argv[3];

if (!filePath || !fieldPositionsInput) {
  console.error('Informe o caminho do arquivo e as posições dos campos.');
  process.exit(1);
}

const fileStruct = {
  gcType : {
    start: 4,
    end: 10
  },
  timegc: {
    start: 4,
    end: 10
  }
}

const dbConfig = {
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'sua_base_de_dados',
};

function gcFilePersisteDb() {

  const processor = new FileProcessor(dbConfig);
  processor.readFileAndInsertData(filePath, fileStruct);
  
}

module.exports = {gcFilePersisteDb}