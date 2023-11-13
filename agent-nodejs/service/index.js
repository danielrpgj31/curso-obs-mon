const mysql = require("mysql2");
const { waitForMySQL } = require("./utils"); // Importa a função waitForMySQL

const connection = mysql.createConnection({
  host: "mysql-container",
  user: "myuser",
  password: "mypassword",
  database: "mydatabase",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Utiliza a função waitForMySQL antes de iniciar o servidor Express
waitForMySQL(connection)
  .then(() => {
    
    // Dados para inclusão na tabela
    const dadosParaInclusao = {
        campo1: 'valor1',
        campo2: 'valor2',
        // Adicione mais campos conforme necessário
    };
    
    // Query para inclusão na tabela
    const query = 'INSERT INTO sua_tabela SET ?';

     //TODO: Implementar INSERT 

  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });
