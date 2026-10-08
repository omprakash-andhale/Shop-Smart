package com.shopsmart.order.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Component
public class InventoryClient {

    private final RestTemplate restTemplate;

    @Value("${inventory.service.url:http://localhost:8083/api/inventory}")
    private String inventoryServiceUrl;

    public InventoryClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void deductStock(Long productId, Integer quantity) {
        try {
            Map<String, Object> request = new HashMap<>();
            request.put("productId", productId);
            request.put("quantity", quantity);
            restTemplate.postForEntity(inventoryServiceUrl + "/deduct", request, Void.class);
        } catch (Exception e) {
            // Log inventory deduct warning if inventory service is decoupled or running standalone
            System.err.println("Notice: Could not communicate directly with inventory service: " + e.getMessage());
        }
    }
}
