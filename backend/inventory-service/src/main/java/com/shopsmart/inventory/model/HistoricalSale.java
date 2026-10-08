package com.shopsmart.inventory.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "historical_sales")
public class HistoricalSale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long productId;

    private LocalDate saleDate;

    private Integer unitsSold;

    private Double averagePrice;

    private Boolean wasPromotionalDay;

    public HistoricalSale() {}

    public HistoricalSale(Long productId, LocalDate saleDate, Integer unitsSold, Double averagePrice, Boolean wasPromotionalDay) {
        this.productId = productId;
        this.saleDate = saleDate;
        this.unitsSold = unitsSold;
        this.averagePrice = averagePrice;
        this.wasPromotionalDay = wasPromotionalDay;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public LocalDate getSaleDate() { return saleDate; }
    public void setSaleDate(LocalDate saleDate) { this.saleDate = saleDate; }

    public Integer getUnitsSold() { return unitsSold; }
    public void setUnitsSold(Integer unitsSold) { this.unitsSold = unitsSold; }

    public Double getAveragePrice() { return averagePrice; }
    public void setAveragePrice(Double averagePrice) { this.averagePrice = averagePrice; }

    public Boolean getWasPromotionalDay() { return wasPromotionalDay; }
    public void setWasPromotionalDay(Boolean wasPromotionalDay) { this.wasPromotionalDay = wasPromotionalDay; }
}
