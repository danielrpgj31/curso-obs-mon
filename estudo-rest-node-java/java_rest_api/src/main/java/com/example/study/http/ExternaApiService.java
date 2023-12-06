package com.example.study.http;

//Async Http Request
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.concurrent.CompletableFuture;

//Sync Http Request
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ExternaApiService {

    private final String apiUrl = "http://api-rest-node:7001/now";

    private final RestTemplate restTemplate;

    public ExternaApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String obterDadosSyncApi() {
        String url = apiUrl;
        return restTemplate.getForObject(url, String.class);
    }

}
