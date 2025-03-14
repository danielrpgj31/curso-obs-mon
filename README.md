## SETUP & RUN Jaeger

docker run -d --name jaeger \
  -e JAEGER_SERVICE_NAME=jaeger \
  -e COLLECTOR_OTLP_ENABLED=true \
  -p 5775:5775 -p 6831:6831/udp -p 5778:5778 -p 14250:14250 -p 14268:14268 -p 16686:16686 -p 4317:4317 -p 4318:4318 jaegertracing/all-in-one:1.41

## SETUP & RUN OpenTelemetry Collector

docker run -d --name otel-collector   -p 4317:4317 -p 4318:4318 -p 9464:9464   -v ./opentelemetry-collector/otel-config.yaml:/etc/otel/config.yaml  otel/opentelemetry-collector-contrib

## SETUP & RUN JAVA 

curl -L -o opentelemetry-javaagent.jar https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar

 java -javaagent:./opentelemetry-javaagent.jar \
      -Dotel.service.name=customer-services \
      -Dotel.traces.exporter=otlp \
      -Dotel.exporter.otlp.endpoint=http://localhost:4318 \
      -Dotel.metrics.exporter=none \
      -Dotel.exporter.otlp.protocol=http/protobuf \
      -Dotel.logs.exporter=none \
      -Dotel.javaagent.debug=true \
  -jar target/customer-service-0.0.1-SNAPSHOT.jar


## SETUP & RUN NodeJs 

  npx ts-node --require ./instrumentation.ts app.ts

## Referencias

  https://last9.io/blog/opentelemetry-agents/#:~:text=An%20OpenTelemetry%20agent%20is%20a%20lightweight%20process%20that,an%20observability%20backend%20like%20Last9%2C%20Prometheus%2C%20or%20Jaeger.

  https://www.baeldung.com/java-opentelemetry-collector