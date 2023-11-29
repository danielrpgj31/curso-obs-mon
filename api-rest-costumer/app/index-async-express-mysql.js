const express = require("express");
const mysql = require("mysql2/promise");
const defaultMetricsRoute = require("./metrics/defaultMetrics");

const app = express();
const port = 3000;

defaultMetricsRoute.setMetricsRoute(app);

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

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
