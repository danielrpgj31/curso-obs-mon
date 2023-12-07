package com.example.study;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import com.example.study.http.ExternaApiService;
import com.example.study.utils.Logger;

@SpringBootApplication
public class RestApiServer {

	public static void main(String[] args) {
		SpringApplication.run(RestApiServer.class, args);
		Logger.LogForLogger("Inicio da aplicacao Springboot Web..");
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
		String apiUrl = this.externaApiService.getApiUrl();

		HttpClient httpClient = HttpClient.newHttpClient();
		HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create(apiUrl))
				// Configurar outros detalhes da requisição (método, cabeçalhos, etc.)
				.build();

		CompletableFuture<HttpResponse<String>> responseFuture = httpClient.sendAsync(request,
				HttpResponse.BodyHandlers.ofString());

		// TODO: Implementar codigo assíncrono (interval), que nao exceda o tempo de
		// retorno da api chamada

		// Aguardar a conclusão
		HttpResponse<String> response;
		String responseBody = "";
		try {
			response = responseFuture.get();
			responseBody = response.body();
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}

		return CompletableFuture.completedFuture("Http Body: " + responseBody);
	}

	@GetMapping("/getsyncremoteapi")
	public String getExternEndpoint() {
		String jsonString = "";
		// Simula uma operação demorada

		try {
			Logger.LogForLogger("Thread id - Metodo sincrono: " + Thread.currentThread().getId());
			jsonString = externaApiService.obterDadosDaApi();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return jsonString;
	}

}