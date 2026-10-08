package com.shopsmart.inventory.dto;

import java.util.List;

public class DemandForecastResponse {
    private Long productId;
    private String productName;
    private Integer currentStock;
    private Integer reorderThreshold;
    private Double averageDailyDemand;
    private Integer predictedDemandNext30Days;
    private Integer recommendedReorderQuantity;
    private Integer safetyStock;
    private String stockRiskLevel; // "LOW", "MEDIUM", "CRITICAL_STOCKOUT_RISK", "OVERSTOCKED"
    private Integer daysUntilStockout;
    private Double confidenceScore; // e.g., 0.92
    private List<DailyForecastPoint> forecastTrend;

    public static class DailyForecastPoint {
        private String date;
        private Integer predictedUnits;

        public DailyForecastPoint() {}
        public DailyForecastPoint(String date, Integer predictedUnits) {
            this.date = date;
            this.predictedUnits = predictedUnits;
        }

        public String getDate() { return date; }
        public void setDate(String date) { this.date = date; }
        public Integer getPredictedUnits() { return predictedUnits; }
        public void setPredictedUnits(Integer predictedUnits) { this.predictedUnits = predictedUnits; }
    }

    public DemandForecastResponse() {}

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public Integer getCurrentStock() { return currentStock; }
    public void setCurrentStock(Integer currentStock) { this.currentStock = currentStock; }

    public Integer getReorderThreshold() { return reorderThreshold; }
    public void setReorderThreshold(Integer reorderThreshold) { this.reorderThreshold = reorderThreshold; }

    public Double getAverageDailyDemand() { return averageDailyDemand; }
    public void setAverageDailyDemand(Double averageDailyDemand) { this.averageDailyDemand = averageDailyDemand; }

    public Integer getPredictedDemandNext30Days() { return predictedDemandNext30Days; }
    public void setPredictedDemandNext30Days(Integer predictedDemandNext30Days) { this.predictedDemandNext30Days = predictedDemandNext30Days; }

    public Integer getRecommendedReorderQuantity() { return recommendedReorderQuantity; }
    public void setRecommendedReorderQuantity(Integer recommendedReorderQuantity) { this.recommendedReorderQuantity = recommendedReorderQuantity; }

    public Integer getSafetyStock() { return safetyStock; }
    public void setSafetyStock(Integer safetyStock) { this.safetyStock = safetyStock; }

    public String getStockRiskLevel() { return stockRiskLevel; }
    public void setStockRiskLevel(String stockRiskLevel) { this.stockRiskLevel = stockRiskLevel; }

    public Integer getDaysUntilStockout() { return daysUntilStockout; }
    public void setDaysUntilStockout(Integer daysUntilStockout) { this.daysUntilStockout = daysUntilStockout; }

    public Double getConfidenceScore() { return confidenceScore; }
    public void setConfidenceScore(Double confidenceScore) { this.confidenceScore = confidenceScore; }

    public List<DailyForecastPoint> getForecastTrend() { return forecastTrend; }
    public void setForecastTrend(List<DailyForecastPoint> forecastTrend) { this.forecastTrend = forecastTrend; }
}
