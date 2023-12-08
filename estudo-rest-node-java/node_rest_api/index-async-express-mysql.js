const express = require("express");
const mysql = require("mysql2/promise");
const appMetrics = require("./metrics/defaultMetrics");
const log = require("./utils/log");
const general = require("./utils/general");
const app = express();
const port = 7001;

appMetrics.setMetricsRoute(app);

// Configuração do MySQL
const pool = mysql.createPool({
  host: "mysql-container",
  user: "myuser",
  password: "mypassword",
  database: "mydatabase",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

function processamentoAssincrono() {
  return new Promise((resolve) => {
    general.delay(20000);
    resolve("Processamento (20s) REST Api finalizada.");
  });
}

//Api Request/Response sincrono
app.get("/api/sync", (req, res) => {
  log.logMessage("Recebida chamada REST Api /api/sync, processando...");
  general.delay(20000);
  log.logMessage("Processamento finalizado.");
  res.json({
    status: "Processamento (20s) REST Api 00110011 finalizado com sucesso.",
  });
});

// Rota para buscar informações do cliente por código
app.get("/cliente/:codigo", async (req, res) => {
  const codigoCliente = req.params.codigo;

  try {
    //Alimenta metrica de throughput
    appMetrics.incThroughputValue();

    // Consulta assíncrona no banco de dados
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.execute(
      "SELECT * FROM costumer WHERE idCostumer = ?",
      [codigoCliente]
    );
    connection.release();

    if (rows.length > 0) {
      res.json(rows[0]); // Retorna o primeiro resultado encontrado
    } else {
      res.status(404).json({ error: "Cliente não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar cliente no banco de dados:", error);
    res.status(500).json({ error: "Erro ao buscar cliente no banco de dados" });
  }
});

//Api que tem retorno imediato
//porém é atrasado diretamente pela latência do eventLoop.
app.get("/now", async (req, res) => {
  try {
    log.logMessage("Recebida chamada REST Api /now, processando...");
    await processamentoAssincrono().then((resultado) => {
      log.logMessage("Finalizado processamento da REST Api /now. (20s).");
      res.json("" + resultado);
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao processar api '/now'" });
  }
});

//Seta o interval:: Vai ocupar o eventloop de forma a impactar toda a app
//assim que o codigo principal dentro das chaves {}, for executado, vai parar
//toda a aplicação, lembrando que é single-thread.
/*
setInterval(() => {
  general.delay(12000);
}, 8000);
*/

// Inicia o servidor
app.listen(port, () => {
  log.logMessage(`Servidor rodando em http://localhost:${port}`);
});
