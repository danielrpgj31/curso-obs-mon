const axios = require('axios');

async function fetchData() {
  try {
    const response = await axios.get('https://api-rest-java/api/async');
    console.log(response.data);
  } catch (error) {
    console.error('Erro ao obter dados:', error.message);
  }
}

fetchData();

setInterval(() => {console.log("I'm alive!")}, 1000);



