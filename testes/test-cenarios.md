# PROFILING 002 - HEAP Limitada no composer (64mb)

> Com dockerize para iniciar app no Docker

> MAX SEMI SPACE = 24

> 100 Threads

> RAMP UP 0.1s

> LOOP COUNT 1000000

> Resultado

App cai em 35ms

```bash
api-rest-costumer-node-app-1 | 2023/11/20 15:23:01 Connected to tcp://mysql-container:3306
api-rest-costumer-node-app-1 | > api-rest-costumer@1.0.0 profiling
api-rest-costumer-node-app-1 | > node --trace-gc --max_semi_space_size=24 index.js 2>&1
api-rest-costumer-node-app-1 | [35:0x7f72874aa090] 12339 ms: Scavenge 20.3 (31.2) -> 15.7 (31.8) MB, 16.24 / 4.95 ms (average mu = 0.999, current mu = 0.994) task;
api-rest-costumer-node-app-1 | 2023/11/20 15:23:36 Command exited with error: signal: killed
api-rest-costumer-node-app-1 exited with code 255
```

# PROFILING 003 - HEAP Limitada no composer (88mb)

> Com dockerize para iniciar app no Docker

> MAX SEMI SPACE = 48

> 100 Threads

> RAMP UP 0,1s

> LOOP COUNT 1000000

# TODO: PROFILING 004 - HEAP Limitada no composer (64mb)

> Com dockerize para iniciar app no Docker

> MAX SEMI SPACE = 48

> 100 Threads

> RAMP UP 10s

> LOOP COUNT 1000000

# TODO: HEAP Limitada no composer (128mb)

> Com dockerize para iniciar app no Docker

> MAX SEMI SPACE = 24

> 100 Threads

> RAMP UP 1s

> LOOP COUNT 1000000

# TODO PROFILING 005 (Sem express/mysql, Limite 88MB de Heap)

Sem express e sem MySQL
Retorno Dummy, apenas para passar no teste
Avaliar a carga de memória em container com limite de 88MB.

# TODO NETWORKING 001 (Conexaoes HTTP)

Testar os endpoints sync e assync e processamento bloquante de 5s.
Validar quantidade de conexoes nao bloquantes pelo netstat -an

# TODO NETWORKING 002 (Conexaoes HTTP)

Testar os endpoints com conexao reduzida no throughput e processamento bloquante de 5s.
Validar quantidade de conexoes nao bloquantes pelo netstat -an

# TODO Rest Api Sincrona

Implementar um wait na api rest (alem da consulta ao banco) para forçar a latencia subir e analisar.
Avaliar como será o comportamento do pool de conexoes do S.O com netstat x a contenção na thread principal do node.

# TODO Rest Api Sincrona

Implementar endpoint Prometheus na app para coleta de metricas de GC, latencia e throughput

# TODO: Balanceamento de carga

Implementar endpoint Prometheus
