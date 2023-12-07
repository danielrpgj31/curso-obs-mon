package com.example.study.http;

//Sync Http Request
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ExternaApiService {

    private String apiUrl = "http://api-rest-node:7001/now";

    public String getApiUrl() {
        return this.apiUrl;
    }

    public void setApiUrl(String apiUrl) {
        this.apiUrl = apiUrl;
    }

    private final RestTemplate restTemplate;

    public RestTemplate getRestTemplate() {
        return this.restTemplate;
    }

    public ExternaApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String obterDadosDaApi() {
        String url = apiUrl;
        return restTemplate.getForObject(url, String.class);
    }

}
