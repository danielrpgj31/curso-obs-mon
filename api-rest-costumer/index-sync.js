const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Configuração do MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "seu_usuario",
  password: "sua_senha",
  database: "sua_base_de_dados",
});

connection.connect();

// Rota para buscar informações do cliente por código
app.get("/cliente/:codigo", (req, res) => {
  const codigoCliente = req.params.codigo;

  // Consulta síncrona no banco de dados
  const query = `SELECT * FROM clientes WHERE codigo = ${codigoCliente}`;
  connection.query(query, (error, results, fields) => {
    if (error) {
      res
        .status(500)
        .json({ error: "Erro ao buscar cliente no banco de dados" });
    } else {
      if (results.length > 0) {
        res.json(results[0]); // Retorna o primeiro resultado encontrado
      } else {
        res.status(404).json({ error: "Cliente não encontrado" });
      }
    }
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
