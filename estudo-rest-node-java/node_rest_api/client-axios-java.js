const axios = require("axios");
const log = require("./utils/log");
const delay = require("./utils/general");

async function fetchAsyncRestApiJava() {
  try {
    const response = await axios.get("http://localhost:9001/api/async");
    return response.data;
  } catch (error) {
    console.error("Erro ao obter dados:", error.message);
  }
}

async function main() {
  const fechDataPromise = fetchAsyncRestApiJava();

  log.logMessage("Processamento sincrono apos chamada api.");

  for (let i = 0; i < 10; i++) {
    //delay.delay(2000); //codigo blocante para todo app node, em funcao do modelo single-thread
    log.logMessage("Aguardando retorno de API assincrona (20s)...");
  }

  const dadosApi = await fechDataPromise;
  log.logMessage("Dados da API: " + dadosApi);
}

main();
