> Atividades para implementar 
  
TODO: Implementar charts para apresentar as metricas de GC: major[qtd, tempo], minor[qtd, tempo]
TODO: Criar procedimento para criar um novo chart, pegar seu json e salvar no projeto para provisionamento com "docker-compose up"
TODO: Como configurar o prometheus e grafana para scraps maiores que 5s (tempo de query na app monitorada)

> Erros (Fazer um tutorial com eles e anexar no curso)

# 1 - Uso do docker-compose no ubuntu 22.04

Baixar binario do site e remover o instalado pelo apt install (repositorio do ubuntu)

# 2 - Erro no container do cadvisor

Construir imagem docker utilizando a imagem base abaixo

gcr.io/cadvisor/cadvisor

ao invés da imagem 

google/cadvisor:latest

> Cenarios 

# 1 - Consumo intenso de memoria em processo nodejs dentro de container com memoria bem limitada
Um container no cadisor vai apontar apenas consumo de memória batendo 100%, até o momento que 
ele perde o container, em função de OOM da engine do nodejs que roda dentro do mesmo. 
Prometheus não consegue se conectar na app, utilizando scrape_timeout = 20s.

# 2 - Monitoramento pró ativo
Implementar uma instrumentação da app nodejs menos invasiva possível (PM2) para coletar consumo de memória e CPU. 
Utilizar API do PM2 em um script separado, para conectar no app monitorado, coletar as informações e enviar para 
prometheus.

Validar o melhor timeout para prometheus.

# 3 - Validar caracteristica do GC em periodo extressante x tranquilo

> Minor GC

* Quantas minor gc quando atinge >90% memoria
* Quantas minor gc quando <20% memoria