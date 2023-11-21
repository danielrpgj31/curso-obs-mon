# PROFILING 002 - HEAP Limitada no composer (64mb)

> Com dockerize para iniciar app no Docker

> MAX SEMI SPACE = 24

> 100 Threads

> RAMP UP 0.1s

> LOOP COUNT 1000000

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

## Com dockerize para iniciar app no Docker

## MAX SEMI SPACE = 48

## 100 Threads

## RAMP UP 10s

## LOOP COUNT 1000000

# TODO: HEAP Limitada no composer (128mb)

## Com dockerize para iniciar app no Docker

## MAX SEMI SPACE = 24

## 100 Threads

## RAMP UP 1s

## LOOP COUNT 1000000
