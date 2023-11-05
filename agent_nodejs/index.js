const pm2 = require('pm2');

pm2.connect((err) => {

  if (err) {
    console.error(err);
    process.exit(2);
  }

  pm2.list((err, processList) => {

    if (err) {
      console.error(err);
      pm2.disconnect();
      process.exit(2);
    }

    console.log('Lista de processos gerenciados pelo PM2:');
    processList.forEach((process) => {
      console.log('Nome do processo:', process.name);
      console.log('ID do processo:', process.pm_id);
      console.log('Uso de CPU:', process.monit.cpu);
      console.log('Uso de memória:', process.monit.memory);
      console.log('------------------------');
    });

    pm2.disconnect();

  });
  
});
