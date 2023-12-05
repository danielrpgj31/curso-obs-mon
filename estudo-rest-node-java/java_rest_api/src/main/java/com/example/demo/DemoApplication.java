package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.concurrent.CompletableFuture;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}

@RestController
@RequestMapping("/api")
class ApiController {

	public ApiController() {
		System.out.println("Thread id - Construtor: " + Thread.currentThread().getId());
	}

	@GetMapping("/async")
	@Async
	public CompletableFuture<String> asyncEndpoint() {
		// Simula uma operação demorada
		try {
			System.out.println("Thread id - Metodo assincrono: " + Thread.currentThread().getId());
			Thread.sleep(20000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		return CompletableFuture.completedFuture("Resposta assíncrona!");
	}
}