package com.shopsmart.inventory.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "inventory")
public class InventoryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Product ID is required")
    @Column(nullable = false, unique = true)
    private Long productId;

    @Column(nullable = false)
    private String productName;

    private String category;

    @NotNull
    @Min(value = 0, message = "Available quantity cannot be negative")
    @Column(nullable = false)
    private Integer availableQuantity;

    @NotNull
    @Min(value = 0, message = "Reserved quantity cannot be negative")
    private Integer reservedQuantity = 0;

    @NotNull
    @Min(value = 1, message = "Reorder threshold must be at least 1")
    private Integer reorderThreshold = 20;

    private Integer optimalBatchSize = 50;

    private Integer leadTimeDays = 3;

    private LocalDateTime lastRestockedAt = LocalDateTime.now();

    public InventoryItem() {}

    public InventoryItem(Long productId, String productName, String category,
                         Integer availableQuantity, Integer reservedQuantity,
                         Integer reorderThreshold, Integer optimalBatchSize, Integer leadTimeDays) {
        this.productId = productId;
        this.productName = productName;
        this.category = category;
        this.availableQuantity = availableQuantity;
        this.reservedQuantity = reservedQuantity;
        this.reorderThreshold = reorderThreshold;
        this.optimalBatchSize = optimalBatchSize;
        this.leadTimeDays = leadTimeDays;
        this.lastRestockedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Integer getAvailableQuantity() { return availableQuantity; }
    public void setAvailableQuantity(Integer availableQuantity) { this.availableQuantity = availableQuantity; }

    public Integer getReservedQuantity() { return reservedQuantity; }
    public void setReservedQuantity(Integer reservedQuantity) { this.reservedQuantity = reservedQuantity; }

    public Integer getReorderThreshold() { return reorderThreshold; }
    public void setReorderThreshold(Integer reorderThreshold) { this.reorderThreshold = reorderThreshold; }

    public Integer getOptimalBatchSize() { return optimalBatchSize; }
    public void setOptimalBatchSize(Integer optimalBatchSize) { this.optimalBatchSize = optimalBatchSize; }

    public Integer getLeadTimeDays() { return leadTimeDays; }
    public void setLeadTimeDays(Integer leadTimeDays) { this.leadTimeDays = leadTimeDays; }

    public LocalDateTime getLastRestockedAt() { return lastRestockedAt; }
    public void setLastRestockedAt(LocalDateTime lastRestockedAt) { this.lastRestockedAt = lastRestockedAt; }
}
