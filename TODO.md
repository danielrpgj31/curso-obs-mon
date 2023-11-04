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

