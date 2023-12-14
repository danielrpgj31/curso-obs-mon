### Utilizando CRI-O com Kubernetes 

O CRI-O (Container Runtime Interface - OCI) é um tempo de execução leve para contêineres que se concentra em atender às especificações do Open Container Initiative (OCI). Ele é frequentemente usado em conjunto com o Kubernetes para executar contêineres.

Se você deseja visualizar as imagens em execução em uma máquina que utiliza o CRI-O como runtime, você pode seguir estas etapas:

Verificar a existência do CRI-O:

Certifique-se de que o CRI-O está instalado e em execução na máquina. Normalmente, você pode verificar isso usando comandos como crio -v para exibir a versão ou systemctl status crio para verificar se o serviço está em execução.

Usar ferramentas Kubernetes:

Como o CRI-O é uma implementação compatível com o Kubernetes, você pode usar as ferramentas padrão do Kubernetes para visualizar as imagens e os pods em execução. Por exemplo:

```
bash
kubectl get pods mostra os pods em execução.
kubectl get nodes para listar os nós do cluster.
kubectl describe pod <nome-do-pod> fornece detalhes específicos sobre um pod, incluindo os contêineres que estão em execução.

```

Usar ferramentas específicas do CRI-O:

CRI-O fornece ferramentas específicas que podem ajudar a interagir com os contêineres. Por exemplo, você pode usar o crictl para listar contêineres em execução e imagens. Aqui estão alguns comandos úteis:

```
bash
crictl ps -a exibe todos os contêineres, incluindo os que não estão em execução.
crictl images lista as imagens disponíveis no CRI-O.
```

Lembre-se de que as ferramentas específicas podem variar dependendo da versão do CRI-O e da configuração do seu sistema. Consulte a documentação oficial do CRI-O para obter informações atualizadas.

Verificar diretórios de armazenamento:
As imagens e os dados dos contêineres geralmente são armazenados em diretórios específicos no sistema de arquivos. Verificar esses diretórios pode fornecer informações adicionais. Os caminhos comuns incluem /var/lib/containers e /var/lib/crio.
Lembre-se de que a capacidade de visualizar imagens em execução pode depender das configurações específicas do CRI-O e do Kubernetes na sua máquina. Certifique-se de estar usando as ferramentas e comandos apropriados para a sua configuração específica.