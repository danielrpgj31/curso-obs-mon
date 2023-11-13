const util = require("util");

const waitForMySQL = async (connection) => {
  const query = util.promisify(connection.query).bind(connection);
  let retries = 5;

  while (retries > 0) {
    try {
      await query("SELECT 1");
      console.log("Conectado ao banco de dados MySQL!");
      return;
    } catch (err) {
      retries -= 1;
      console.log(
        `Tentando se reconectar ao MySQL. Tentativas restantes: ${retries}`
      );

      // Espera 2 segundos antes de tentar novamente
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  throw new Error("Não foi possível conectar ao banco de dados MySQL.");
};

module.exports = { waitForMySQL };
