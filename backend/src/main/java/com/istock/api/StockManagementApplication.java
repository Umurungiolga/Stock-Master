package com.istock.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.event.EventListener;
import org.springframework.boot.context.event.ApplicationReadyEvent;

@SpringBootApplication
public class StockManagementApplication {

    private static final Logger logger = LoggerFactory.getLogger(StockManagementApplication.class);

    @Value("${server.port:8080}")
    private String port;

    public static void main(String[] args) {
        SpringApplication.run(StockManagementApplication.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        logger.info("Swagger UI is available at: http://localhost:{}/swagger-ui", port);
        logger.info("OpenAPI JSON is available at: http://localhost:{}/api-docs", port);
    }
}
