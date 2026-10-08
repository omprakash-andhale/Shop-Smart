package com.shopsmart.inventory.repository;

import com.shopsmart.inventory.model.HistoricalSale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HistoricalSaleRepository extends JpaRepository<HistoricalSale, Long> {
    List<HistoricalSale> findByProductIdOrderBySaleDateAsc(Long productId);
    List<HistoricalSale> findByProductIdAndSaleDateAfterOrderBySaleDateAsc(Long productId, LocalDate date);
}
