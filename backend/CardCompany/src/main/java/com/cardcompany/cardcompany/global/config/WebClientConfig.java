package com.cardcompany.cardcompany.global.config;

import com.cardcompany.cardcompany.global.handler.ClientErrorHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    private final String BASE_URL = "https://finopenapi.ssafy.io/ssafy/api/v1";

    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder()
                .baseUrl(BASE_URL)
                .filter(new ClientErrorHandler());
    }

}
