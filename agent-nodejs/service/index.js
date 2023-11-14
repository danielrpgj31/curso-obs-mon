const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "mysql-container",
  user: "myuser",
  password: "mypassword",
  database: "mydatabase",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

function AddPrice(dataToInsert) {
  // Query SQL para inserção em lote
  const insertQuery = "INSERT INTO preco (nome, preco) VALUES ?";

  // Executa a inserção em lote
  connection.connect((err) => {
    if (err) {
      console.error("Erro ao conectar ao banco de dados:", err);
      return;
    }

    connection.query(
      insertQuery,
      [dataToInsert.map((item) => [item.name, item.price])],
      (err, results) => {
        if (err) {
          console.error("Erro ao inserir em lote:", err);
        } else {
          console.log(
            "Inserção em lote bem-sucedida. IDs inseridos:",
            results.insertId
          );
        }

        // Fecha a conexão após a inserção
        connection.end();
      }
    );
  });
}

module.exports = { AddPrice };
