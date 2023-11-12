const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: "mysql-container",
  user: "myuser",
  password: "mypassword",
  database: "mydatabase",
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conectado ao banco de dados MySQL!");
});

// Endpoint para buscar todos os dados de uma tabela específica
app.get("/queryall", (req, res) => {
  const tableName = "sua_tabela"; // Substitua pelo nome da sua tabela

  const query = `SELECT * FROM ${tableName};`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao executar a consulta:", err);
      res.status(500).send("Erro ao buscar dados do banco de dados.");
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});
