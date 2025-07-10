package br.com.descompile.tracing;

import io.opentelemetry.exporter.jaeger.JaegerGrpcSpanExporter;
import io.opentelemetry.sdk.OpenTelemetrySdk;
import io.opentelemetry.sdk.trace.SdkTracerProvider;
import io.opentelemetry.sdk.trace.export.BatchSpanProcessor;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.api.GlobalOpenTelemetry;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JaegerConfig {
    
    @Bean
    public OpenTelemetrySdk openTelemetry() {
        JaegerGrpcSpanExporter exporter = JaegerGrpcSpanExporter.builder()
                .setEndpoint("http://localhost:14250")
                .build();

        SdkTracerProvider tracerProvider = SdkTracerProvider.builder()
                .addSpanProcessor(BatchSpanProcessor.builder(exporter).build())
                .build();

        OpenTelemetrySdk sdk = OpenTelemetrySdk.builder()
                .setTracerProvider(tracerProvider)
                .build();

        GlobalOpenTelemetry.set(sdk);
        return sdk;
    }

    @Bean
    public Tracer tracer(OpenTelemetrySdk openTelemetry) {
        return openTelemetry.getTracer("java-service");
    }
}
