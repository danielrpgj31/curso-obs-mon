const express = require("express");
const mysql = require("mysql2/promise");
const appMetrics = require("./metrics/defaultMetrics");
const log = require("./utils/log")
const general = require("./utils/general")
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
    res.json("Processamento '/now' efetuada com sucesso.");
  } catch (error) {
    res.status(500).json({ error: "Erro ao processar api '/now'" });
  }
});

//Seta o interval:: Vai ocupar o eventloop de forma a impactar toda a app
setInterval(() => {
  general.delay(12000);  
}, 1000);

// Inicia o servidor
app.listen(port, () => {
  log.logMessage(`Servidor rodando em http://localhost:${port}`);
});
