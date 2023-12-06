package com.example.study;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.study.http.ExternaApiService;
import com.example.study.utils.Logger;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.concurrent.CompletableFuture;

@SpringBootApplication
public class RestApiServer {

	public static void main(String[] args) {
		SpringApplication.run(RestApiServer.class, args);
		Logger.getTimeForLogger("Inicio da aplicacao Springboot Web..");
	}

}

@RestController
@RequestMapping("/api")
class ApiController {

	private final ExternaApiService externaApiService;

	@Autowired
	public ApiController(ExternaApiService externaApiService) {
		this.externaApiService = externaApiService;
	}

	@GetMapping("/async")
	@Async
	public CompletableFuture<String> asyncEndpoint() {
		// Simula uma operação demorada
		try {
			Logger.getTimeForLogger("Thread id - Metodo assincrono: " + Thread.currentThread().getId());
			Thread.sleep(20000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		return CompletableFuture.completedFuture("Resposta síncrona!");
	}

	@GetMapping("/sync/external")
	public String getExternEndpoint() {
		String jsonString = "";
		// Simula uma operação demorada

		try {
			Logger.getTimeForLogger("Thread id - Metodo sincrono: " + Thread.currentThread().getId());
			jsonString = externaApiService.obterDadosSyncApi();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return jsonString;
	}

}