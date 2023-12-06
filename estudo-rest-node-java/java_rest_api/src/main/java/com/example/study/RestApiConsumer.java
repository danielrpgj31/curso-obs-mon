package com.example.study;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

public class RestApiConsumer {


    private RestTemplate restTemplate;

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
