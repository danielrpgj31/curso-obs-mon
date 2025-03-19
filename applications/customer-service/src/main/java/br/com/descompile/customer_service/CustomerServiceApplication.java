package br.com.descompile.customer_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@RestController
public class CustomerServiceApplication {

    private final RestTemplate restTemplate = new RestTemplate();

	public static void main(String[] args) {
		SpringApplication.run(CustomerServiceApplication.class, args);
	}

	@GetMapping("/trace")
    public String startTrace(@RequestParam String name) {
        String response = restTemplate.getForObject("http://localhost:8081/trace?name=" + name, String.class);
        return "Java says: " + response;
    }

}
