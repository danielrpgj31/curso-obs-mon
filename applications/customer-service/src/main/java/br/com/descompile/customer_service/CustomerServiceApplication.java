package br.com.descompile.customer_service;

//import io.opentelemetry.api.trace.Span;
//import io.opentelemetry.api.trace.Tracer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@RestController
public class CustomerServiceApplication {

	//private final Tracer tracer;
    private final RestTemplate restTemplate = new RestTemplate();

    /*
    public CustomerServiceApplication(Tracer tracer) {
        this.tracer = tracer;
    }
    */

	public static void main(String[] args) {
		SpringApplication.run(CustomerServiceApplication.class, args);
	}

	@GetMapping("/trace")
    public String startTrace(@RequestParam String name) {
        //Span span = tracer.spanBuilder("start-trace-java").startSpan();

        //String response = restTemplate.getForObject("http://app-tracing-node:8081/trace?name=" + name, String.class);
        String response = restTemplate.getForObject("http://localhost:8081/trace?name=" + name, String.class);
        
        //span.end();
        return "Java says: " + response;
    }

}
