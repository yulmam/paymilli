package com.cardcompany.cardcompany.global.config;


import com.cardcompany.cardcompany.global.properties.KeyProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties({
    KeyProperties.class
})
public class PropertiesConfig {

}
