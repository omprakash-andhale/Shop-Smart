package com.shopsmart.inventory.service;

import com.shopsmart.inventory.ai.DemandForecastingEngine;
import com.shopsmart.inventory.dto.DemandForecastResponse;
import com.shopsmart.inventory.exception.InventoryUnavailableException;
import com.shopsmart.inventory.model.HistoricalSale;
import com.shopsmart.inventory.model.InventoryItem;
import com.shopsmart.inventory.repository.HistoricalSaleRepository;
import com.shopsmart.inventory.repository.InventoryRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final HistoricalSaleRepository historicalSaleRepository;
    private final DemandForecastingEngine demandForecastingEngine;

    public InventoryService(InventoryRepository inventoryRepository,
                            HistoricalSaleRepository historicalSaleRepository,
                            DemandForecastingEngine demandForecastingEngine) {
        this.inventoryRepository = inventoryRepository;
        this.historicalSaleRepository = historicalSaleRepository;
        this.demandForecastingEngine = demandForecastingEngine;
    }

    public List<InventoryItem> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public InventoryItem getInventoryByProductId(Long productId) {
        return inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new InventoryUnavailableException("Inventory record not found for productId: " + productId));
    }

    public List<InventoryItem> getLowStockAlerts() {
        return inventoryRepository.findLowStockItems();
    }

    @Transactional
    public InventoryItem deductStock(Long productId, Integer quantity) {
        InventoryItem item = getInventoryByProductId(productId);
        if (item.getAvailableQuantity() < quantity) {
            throw new InventoryUnavailableException(
                "Insufficient stock for " + item.getProductName() + ". Available: " + item.getAvailableQuantity() + ", Requested: " + quantity);
        }
        item.setAvailableQuantity(item.getAvailableQuantity() - quantity);

        // Record real-time sale into historical data for continuous AI model training
        HistoricalSale todaySale = new HistoricalSale(productId, LocalDate.now(), quantity, 0.0, false);
        historicalSaleRepository.save(todaySale);

        return inventoryRepository.save(item);
    }

    @Transactional
    public InventoryItem restock(Long productId, Integer quantity) {
        InventoryItem item = getInventoryByProductId(productId);
        item.setAvailableQuantity(item.getAvailableQuantity() + quantity);
        item.setLastRestockedAt(LocalDateTime.now());
        return inventoryRepository.save(item);
    }

    public DemandForecastResponse getForecastForProduct(Long productId) {
        InventoryItem item = getInventoryByProductId(productId);
        List<HistoricalSale> sales = historicalSaleRepository.findByProductIdOrderBySaleDateAsc(productId);
        return demandForecastingEngine.calculateForecast(item, sales);
    }

    public List<DemandForecastResponse> getAllForecasts() {
        List<InventoryItem> items = inventoryRepository.findAll();
        List<DemandForecastResponse> responses = new ArrayList<>();
        for (InventoryItem item : items) {
            List<HistoricalSale> sales = historicalSaleRepository.findByProductIdOrderBySaleDateAsc(item.getProductId());
            responses.add(demandForecastingEngine.calculateForecast(item, sales));
        }
        return responses;
    }

    @PostConstruct
    public void seedInitialInventoryAndHistoricalData() {
        if (inventoryRepository.count() == 0) {
            // Seed inventory matching catalog
            List<InventoryItem> items = List.of(
                new InventoryItem(1L, "boAt Airdopes 141 TWS Earbuds", "Electronics", 45, 2, 20, 50, 2),
                new InventoryItem(2L, "Noise ColorFit Pulse 3 Smart Watch", "Mobiles & Tablets", 12, 0, 15, 40, 3), // Low stock alert!
                new InventoryItem(3L, "Nike Revolution 7 Men Running Shoes", "Sports, Fitness & Outdoors", 28, 1, 15, 30, 4),
                new InventoryItem(4L, "Samsung Galaxy A54 5G (8GB | 128GB)", "Mobiles & Tablets", 8, 0, 10, 25, 3), // Low stock alert!
                new InventoryItem(5L, "Safari Laptop Backpack (30L)", "Fashion", 62, 3, 20, 50, 2),
                new InventoryItem(6L, "Puma Unisex Sneakers", "Fashion", 35, 1, 15, 40, 3),
                new InventoryItem(7L, "OnePlus Nord CE 4 5G", "Mobiles & Tablets", 18, 0, 12, 30, 3),
                new InventoryItem(8L, "Sony WH-CH520 Wireless Headphones", "Electronics", 22, 2, 10, 25, 2),
                new InventoryItem(9L, "Levi's Men Slim Fit Jeans", "Fashion", 40, 2, 15, 50, 4),
                new InventoryItem(10L, "Adidas Backpack", "Sports, Fitness & Outdoors", 30, 0, 15, 35, 3),
                new InventoryItem(11L, "The Psychology of Money", "Books & Stationery", 95, 5, 25, 100, 1),
                new InventoryItem(12L, "Milton Water Bottle (1L)", "Home & Kitchen", 55, 1, 20, 60, 2),
                new InventoryItem(13L, "Apple iPhone 15 (128 GB) - Blue", "Mobiles & Tablets", 6, 0, 10, 20, 2), // Critical stock alert!
                new InventoryItem(14L, "MacBook Air M2 13-inch (16GB RAM, 512GB SSD)", "Laptops & Accessories", 14, 0, 8, 15, 4)
            );
            inventoryRepository.saveAll(items);

            // Generate 30 days of realistic historical sales for AI engine per product
            Random random = new Random(42);
            List<HistoricalSale> historicalSales = new ArrayList<>();
            LocalDate start = LocalDate.now().minusDays(30);

            for (InventoryItem item : items) {
                int baseSales = switch (item.getCategory()) {
                    case "Electronics" -> 4;
                    case "Mobiles & Tablets" -> 3;
                    case "Fashion" -> 5;
                    case "Books & Stationery" -> 8;
                    default -> 3;
                };

                for (int i = 0; i < 30; i++) {
                    LocalDate date = start.plusDays(i);
                    boolean isPromo = (i % 7 == 0);
                    int units = baseSales + random.nextInt(4) + (isPromo ? random.nextInt(5) : 0);
                    historicalSales.add(new HistoricalSale(item.getProductId(), date, units, 0.0, isPromo));
                }
            }
            historicalSaleRepository.saveAll(historicalSales);
        }
    }
}
