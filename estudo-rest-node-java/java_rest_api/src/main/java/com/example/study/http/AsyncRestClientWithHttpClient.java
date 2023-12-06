package com.example.study.http;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class AsyncRestClientWithHttpClient {

    public static void requestRemoteSyncRestApi(String[] args) throws InterruptedException, ExecutionException {
        String apiUrl = "https://api.example.com/data";

        HttpClient httpClient = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                // Configurar outros detalhes da requisição (método, cabeçalhos, etc.)
                .build();

        CompletableFuture<HttpResponse<String>> responseFuture = httpClient.sendAsync(request,
                HttpResponse.BodyHandlers.ofString());

        // Aguardar a conclusão
        HttpResponse<String> response = responseFuture.get();
        String responseBody = response.body();
        System.out.println(responseBody);
    }
}