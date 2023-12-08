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

import com.example.study.http.RemoteApiService;
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

	private final RemoteApiService externaApiService;

	@Autowired
	public ApiController(RemoteApiService externaApiService) {
		this.externaApiService = externaApiService;
	}

	@GetMapping("/async")
	@Async
	public CompletableFuture<String> asyncEndpoint() throws InterruptedException {
		String apiUrl = this.externaApiService.getApiUrl();

		HttpClient httpClient = HttpClient.newHttpClient();
		HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create(apiUrl))
				// Configurar outros detalhes da requisição (método, cabeçalhos, etc.)
				.build();

		Logger.LogForLogger(".. Executing sendAsync() .. ");
		CompletableFuture<HttpResponse<String>> responseFuture = httpClient.sendAsync(request,
				HttpResponse.BodyHandlers.ofString());

		// Valida que realmente se pode executar codigo enquanto aguardamos a
		// finalizacao de um API remota,
		// sem que o tempo gasto no codigo local impacte no tempo de processamenta da
		// API.
		// Exemplo: Api remota retorna em 20s. Se Loop com thread.sleep for até este
		// tempo, os dois códigos finalizam exatamente ao mesmo tempo.
		for (int i = 1; i <= 1; i++) {
			Logger.LogForLogger("[" + i + "] sleeping(2s) .. ");
			Thread.sleep(2000);
		}

		// Aguardar a conclusão
		HttpResponse<String> response;
		String responseBody = "";
		try {
			response = responseFuture.get();
			responseBody = response.body();
			Logger.LogForLogger(".. Executing Http Response callBack () .. ");

		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}

		return CompletableFuture.completedFuture(responseBody);
	}

	@GetMapping("/sync/external")
	public String getExternEndpoint() {
		String jsonString = "";
		// Simula uma operação demorada

		try {
			Logger.LogForLogger(".. Consuming sync REST API() .. ");
			jsonString = externaApiService.obterDadosSyncApi();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return jsonString;
	}

}