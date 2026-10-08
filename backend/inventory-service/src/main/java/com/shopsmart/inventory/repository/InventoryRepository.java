package com.shopsmart.inventory.repository;

import com.shopsmart.inventory.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<InventoryItem, Long> {
    Optional<InventoryItem> findByProductId(Long productId);

    @Query("SELECT i FROM InventoryItem i WHERE i.availableQuantity <= i.reorderThreshold")
    List<InventoryItem> findLowStockItems();
}
