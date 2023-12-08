package com.example.study.http;

//Sync Http Request
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RemoteApiService {

    private String apiUrl = "http://api-rest-node:7001/now";
    private String apiUrl2 = "http://api-rest-node:7001/api/sync/";

    public String getApiUrl2() {
        return this.apiUrl2;
    }

    public void setApiUrl2(String apiUrl2) {
        this.apiUrl2 = apiUrl2;
    }

    public RestTemplate getRestTemplate() {
        return this.restTemplate;
    }

    public String getApiUrl() {
        return this.apiUrl;
    }

    public void setApiUrl(String apiUrl) {
        this.apiUrl = apiUrl;
    }

    private final RestTemplate restTemplate;

    public RemoteApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String obterDadosSyncApi() {
        String url = apiUrl;
        return restTemplate.getForObject(url, String.class);
    }

}
