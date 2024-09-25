package com.cardcompany.cardcompany.global.properties;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "saffy")
public class KeyProperties {

    private final String apiKey;
}
