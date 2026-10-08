package com.shopsmart.inventory.controller;

import com.shopsmart.inventory.dto.DemandForecastResponse;
import com.shopsmart.inventory.model.InventoryItem;
import com.shopsmart.inventory.service.InventoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "*")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping
    public ResponseEntity<List<InventoryItem>> getAllInventory() {
        return ResponseEntity.ok(inventoryService.getAllInventory());
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<InventoryItem> getInventoryByProductId(@PathVariable Long productId) {
        return ResponseEntity.ok(inventoryService.getInventoryByProductId(productId));
    }

    @GetMapping("/low-stock-alerts")
    public ResponseEntity<List<InventoryItem>> getLowStockAlerts() {
        return ResponseEntity.ok(inventoryService.getLowStockAlerts());
    }

    @PostMapping("/deduct")
    public ResponseEntity<InventoryItem> deductStock(@RequestBody Map<String, Object> request) {
        Long productId = Long.valueOf(request.get("productId").toString());
        Integer quantity = Integer.valueOf(request.get("quantity").toString());
        return ResponseEntity.ok(inventoryService.deductStock(productId, quantity));
    }

    @PostMapping("/restock")
    public ResponseEntity<InventoryItem> restock(@RequestBody Map<String, Object> request) {
        Long productId = Long.valueOf(request.get("productId").toString());
        Integer quantity = Integer.valueOf(request.get("quantity").toString());
        return ResponseEntity.ok(inventoryService.restock(productId, quantity));
    }

    @GetMapping("/ai/forecast/{productId}")
    public ResponseEntity<DemandForecastResponse> getProductForecast(@PathVariable Long productId) {
        return ResponseEntity.ok(inventoryService.getForecastForProduct(productId));
    }

    @GetMapping("/ai/forecasts")
    public ResponseEntity<List<DemandForecastResponse>> getAllProductForecasts() {
        return ResponseEntity.ok(inventoryService.getAllForecasts());
    }
}
