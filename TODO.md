# Atividades para implementar

TODO: Implementar charts para apresentar as metricas de GC: major[qtd, tempo], minor[qtd, tempo]
TODO: Criar procedimento para criar um novo chart, pegar seu json e salvar no projeto para provisionamento com "docker-compose up"
TODO: Como configurar o prometheus e grafana para scraps maiores que 5s (tempo de query na app monitorada)

- Erros (Fazer um tutorial com eles e anexar no curso)

### 1 - Uso do docker-compose no ubuntu 22.04

Baixar binario do site e remover o instalado pelo apt install (repositorio do ubuntu)

### 2 - Erro no container do cadvisor

Construir imagem docker utilizando a imagem base abaixo

gcr.io/cadvisor/cadvisor

ao invés da imagem

google/cadvisor:latest

# Cenarios

### 1 - Consumo intenso de memoria em processo nodejs dentro de container com memoria bem limitada

Um container no cadisor vai apontar apenas consumo de memória batendo 100%, até o momento que
ele perde o container, em função de OOM da engine do nodejs que roda dentro do mesmo.
Prometheus não consegue se conectar na app, utilizando scrape_timeout = 20s.

### 2 - Monitoramento pró ativo

Implementar uma instrumentação da app nodejs menos invasiva possível (PM2) para coletar consumo de memória e CPU.
Utilizar API do PM2 em um script separado, para conectar no app monitorado, coletar as informações e enviar para
prometheus.

Validar o melhor timeout para prometheus.

### 3 - Validar caracteristica do GC em periodo extressante x tranquilo

- Minor GC

* Quantas minor gc quando atinge >90% memoria
* Quantas minor gc quando <20% memoria

- Monitoramento de logs de GC com Promtail e Loki

* Fechar análise: configurar grafana no docker-compose
* Configurar geração de log de gc de um app node para analise
* Acessar grafana, configurar datasource e testar as queries
* https://grafana.com/docs/loki/latest/query/log_queries/

### 4 - Promtail & Loki

- Processamento de arquivo de log de trace do gc de nodejs

* Testar a query no grafana, para datasource loki:

```
  sum_over_time((substr 19 6 as time) | interval 1s)
```

- Do sample abaixo

```shell
[5387:0x62236a0] 41 ms: Scavenge 6.0 (6.1) -> 5.4 (7.1) MB, 0.9 / 0.0 ms (average mu = 1.000, current mu = 1.000) allocation failure;
[5387:0x62236a0] 51 ms: Scavenge 6.2 (7.4) -> 5.8 (7.9) MB, 0.6 / 0.0 ms (average mu = 1.000, current mu = 1.000) allocation failure;
[5387:0x62236a0] 64 ms: Scavenge 7.0 (8.1) -> 6.3 (8.6) MB, 0.6 / 0.0 ms (average mu = 1.000, current mu = 1.000) allocation failure;
[5387:0x62236a0] 74 ms: Scavenge 7.3 (8.6) -> 6.8 (11.1) MB, 0.9 / 0.0 ms (average mu = 1.000, current mu = 1.000) allocation failure;
[5387:0x62236a0] 90 ms: Scavenge 9.0 (11.3) -> 8.1 (12.1) MB, 1.0 / 0.0 ms (average mu = 1.000, current mu = 1.000) allocation failure;
[5387:0x62236a0] 1940291 ms: Scavenge 161.3 (165.1) -> 160.4 (168.1) MB, 3.2 / 0.0 ms (average mu = 0.999, current mu = 0.998) allocation failure;
[5387:0x62236a0] 1940300 ms: Scavenge 162.3 (168.1) -> 160.4 (168.1) MB, 2.6 / 0.0 ms (average mu = 0.999, current mu = 0.998) allocation failure;
[5387:0x62236a0] 1940306 ms: Scavenge 162.3 (168.1) -> 160.5 (168.1) MB, 2.1 / 0.0 ms (average mu = 0.999, current mu = 0.998) allocation failure;
[5387:0x62236a0] 1940311 ms: Scavenge 162.3 (168.1) -> 160.5 (168.1) MB, 2.0 / 0.0 ms (average mu = 0.999, current mu = 0.998) allocation failure;
[5387:0x62236a0] 1940318 ms: Scavenge 162.4 (168.1) -> 160.5 (168.1) MB, 2.7 / 0.0 ms (average mu = 0.999, current mu = 0.998) allocation failure;
[5387:0x62236a0] 1940325 ms: Scavenge 162.4 (168.1) -> 160.6 (168.1) MB, 2.9 / 0.0 ms (average mu = 0.999, current mu = 0.998) allocation failure;

```

#### 5 - Comparativo de desenpenho durante inicialização

Implementar 3 solucoes de microserviço (Spring boot, quarkus, micronaut) em java, para demonstrar as diferenças e implementações utilizadas.
