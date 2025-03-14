# Usa uma imagem base com Java 17 (ou outra versão necessária)
FROM eclipse-temurin:17-jdk AS builder

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o agente OpenTelemetry e a aplicação para o contêiner
COPY opentelemetry-javaagent.jar .
COPY target/customer-service-0.0.1-SNAPSHOT.jar customer-service-0.0.1-SNAPSHOT.jar

# Comando de execução exatamente como especificado
CMD java \
    -javaagent:./opentelemetry-javaagent.jar \
    -Dotel.service.name=customer-services \
    -Dotel.traces.exporter=otlp \
    -Dotel.exporter.otlp.endpoint=http://telemetry-collector:4318 \
    -Dotel.metrics.exporter=none \
    -Dotel.exporter.otlp.protocol=http/protobuf \
    -Dotel.logs.exporter=none \
    -Dotel.javaagent.debug=true \
    -jar customer-service-0.0.1-SNAPSHOT.jar
