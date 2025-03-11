/*
docker run -d --name otel-collector \
  -p 4317:4317 -p 4318:4318 -p 9464:9464 \
  -v $(pwd)/opentelemetry/otel-config.yml:/etc/otel/config.yaml \
  otel/opentelemetry-collector-contrib

*/

https://last9.io/blog/how-to-instrument-java-applications-using-opentelemetry-tutorial-best-practices/

docker run -d --name jaeger \
  -e JAEGER_SERVICE_NAME=jaeger \
  -e COLLECTOR_OTLP_ENABLED=true \
  -p 5775:5775 -p 6831:6831/udp -p 5778:5778 -p 14250:14250 -p 14268:14268 -p 16686:16686 -p 4317:4317 -p 4318:4318 jaegertracing/all-in-one:1.41

curl -L -o opentelemetry-javaagent.jar https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar

# Add environment variables to your Dockerfile
export OTEL_EXPORTER_JAEGER_SERVICE_NAME=my-app
export OTEL_EXPORTER_JAEGER_AGENT_HOST=jaeger-agent
export OTEL_EXPORTER_JAEGER_AGENT_PORT=6831

-Dotel.service.name=address-api -Dotel.traces.exporter=otlp -Dotel.metrics.exporter=none -Dotel.exporter.otlp.endpoint=http://localhost:4318 -Dotel.exporter.otlp.protocol=http/protobuf

java -javaagent:./opentelemetry-javaagent.jar \
    -Dotel.service.name=Customer-Services \
    -Dotel.traces.exporter=otlp \
    -Dotel.exporter.otlp.endpoint=http://localhost:4318 \
    -Dotel.metrics.exporter=none \
    -Dotel.exporter.otlp.protocol=http/protobuf \
    -Dotel.logs.exporter=none \
    -Dotel.javaagent.debug=true \
    -jar target/customer-service-0.0.1-SNAPSHOT.jar

java -javaagent:./opentelemetry-javaagent.jar \
    -Dotel.service.name=Customer-Services \
    -Dotel.traces.exporter=otlp \
    -Dotel.exporter.otlp.endpoint=http://localhost:4318/v1/traces \
    -Dotel.javaagent.debug=true \
    -jar target/customer-service-0.0.1-SNAPSHOT.jar