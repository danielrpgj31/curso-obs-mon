const fs = require("fs");
const mysql = require("mysql2");

class PersistenceTraceGc {
  constructor() {
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

  persistTrace(dataToPersist) {
    const insertQuery = `
      INSERT INTO tracegc (type, timegc, heap_used, heap_cleaned, gcfrequency)
      VALUES (?, ?, ?, ?, ?)
    `;

    this.connection.query(insertQuery, dataToPersist, (err) => {
      if (err) throw err;
      console.log("Dados inseridos com sucesso.");
    });

  }

  closeDb() {
    this.connection.end();
  }
  
}

const dbConfig = {
  host: "localhost",
  user: "myuser",
  password: "mypassword",
  database: "mydatabase",
};

module.exports = { PersistenceTraceGc };
