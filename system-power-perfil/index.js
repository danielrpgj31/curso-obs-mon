const { exec } = require('child_process');

// Função para ajustar o perfil de energia
function setPowerProfile(profile) {
    // Comando para ajustar o perfil de energia no Ubuntu (usando systemd)
    const command = `powerprofilesctl set ${profile}`;

    // Executar o comando
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao ajustar o perfil de energia: ${error.message}`);
            return;
        }

        console.log(`Perfil de energia ajustado para ${profile}`);
    });
}

// Uso da função para definir o perfil de energia para "performance"
setPowerProfile('performance');
