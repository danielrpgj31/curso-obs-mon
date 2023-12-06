package com.example.study;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ExternaApiService {

    private final String apiUrl = "http://api-rest-node:7001/now";

    private final RestTemplate restTemplate;

    public ExternaApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String obterDadosDaApi() {
        String url = apiUrl;
        return restTemplate.getForObject(url, String.class);
    }

}
