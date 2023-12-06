package com.example.study;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.concurrent.CompletableFuture;

public class RestApiConsumer {


    private RestTemplate restTemplate;
    private static String apiUrl = "https://api.example.com/data";

    public static void main(String[] args) {
        
        fetchDataAsync(apiUrl);
    }

    private static void fetchDataAsync(String apiUrl) {
        HttpClient httpClient = HttpClient.newHttpClient();
        HttpRequest httpRequest = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .build();

        CompletableFuture<Void> future = httpClient
                .sendAsync(httpRequest, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body)
                .thenAccept(responseBody -> {
                    System.out.println("Response: " + responseBody);
                })
                .exceptionally(throwable -> {
                    System.err.println("Erro ao consumir a API: " + throwable.getMessage());
                    return null;
                });

        // Espera a conclusão da requisição assíncrona
        future.join();
    }

    public void ExternalApiController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/data")
    public ResponseEntity<?> consumeExternalApi() {
        // Utilizando var para inferência de tipo local
        var response = restTemplate.getForEntity("https://java_rest_api/now/", String.class);

        // Você pode processar a resposta aqui conforme necessário
        return ResponseEntity.ok(response.getBody());
    }
    
}
