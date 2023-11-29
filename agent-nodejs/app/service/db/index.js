const fs = require("fs");
const mysql = require("mysql2");

class DbTrace {
  constructor() {
    this.connection = mysql.createConnection(dbConfig);
  }

  runCalcGcStatistics() {
    const runCalcProc = `CALL P_CALC_GC_STATISTICS();`;

    this.connection.query(runCalcProc, (err) => {
      console.log("Procedure de calculo executado.");
    });
  }

  persistTrace(dataToPersist) {
    if (dataToPersist.length < 5) {
      // Encapsula o erro em uma nova exceção com mais informações
      const novaExcecao = new Error(
        `Invalid dataToPersist content: ${dataToPersist}`
      );
      novaExcecao.causaOriginal = err;
      // Lança a nova exceção
      throw novaExcecao;
    }

    const insertQuery = `
      INSERT INTO tracegc (type, timegc, heap_used, heap_cleaned, gcfrequency)
      VALUES (?, ?, ?, ?, ?)
    `;

    this.connection.query(insertQuery, dataToPersist, (err) => {
      if (err) {
        // Encapsula o erro em uma nova exceção com mais informações
        const novaExcecao = new Error(
          `Insert Error. Variable dataToPersist: ${dataToPersist}`
        );
        novaExcecao.causaOriginal = err;
        // Lança a nova exceção
        throw novaExcecao;
      }
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

module.exports = { DbTrace };
