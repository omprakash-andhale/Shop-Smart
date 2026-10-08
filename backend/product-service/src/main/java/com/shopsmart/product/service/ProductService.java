package com.shopsmart.product.service;

import com.shopsmart.product.exception.ResourceNotFoundException;
import com.shopsmart.product.model.Product;
import com.shopsmart.product.repository.ProductRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategoryIgnoreCase(category);
    }

    public List<Product> getTopDeals() {
        return productRepository.findByIsTopDealTrue();
    }

    public List<Product> getAiRecommendations() {
        return productRepository.findByIsAiRecommendedTrue();
    }

    public List<Product> searchProducts(String query) {
        if (query == null || query.trim().isEmpty()) {
            return getAllProducts();
        }
        return productRepository.searchProducts(query.trim());
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updated) {
        Product existing = getProductById(id);
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setCategory(updated.getCategory());
        existing.setSubcategory(updated.getSubcategory());
        existing.setBrand(updated.getBrand());
        existing.setPrice(updated.getPrice());
        existing.setOriginalPrice(updated.getOriginalPrice());
        existing.setDiscountPercentage(updated.getDiscountPercentage());
        existing.setRating(updated.getRating());
        existing.setReviewsCount(updated.getReviewsCount());
        existing.setImageUrl(updated.getImageUrl());
        existing.setIsTopDeal(updated.getIsTopDeal());
        existing.setIsAiRecommended(updated.getIsAiRecommended());
        existing.setTags(updated.getTags());
        return productRepository.save(existing);
    }

    public void deleteProduct(Long id) {
        Product existing = getProductById(id);
        productRepository.delete(existing);
    }

    @PostConstruct
    public void seedInitialData() {
        if (productRepository.count() == 0) {
            List<Product> seedProducts = Arrays.asList(
                // Top Deals of the Day (exact items from screenshot)
                new Product("boAt Airdopes 141 TWS Earbuds", "Electronics", "Audio", "boAt",
                        new BigDecimal("1499"), new BigDecimal("2499"), 40, 4.3, 12400,
                        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60",
                        true, false, "audio,tws,earbuds,boat"),

                new Product("Noise ColorFit Pulse 3 Smart Watch", "Mobiles & Tablets", "Wearables", "Noise",
                        new BigDecimal("2899"), new BigDecimal("3999"), 28, 4.2, 8100,
                        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
                        true, false, "smartwatch,noise,wearables"),

                new Product("Nike Revolution 7 Men Running Shoes", "Sports, Fitness & Outdoors", "Footwear", "Nike",
                        new BigDecimal("3899"), new BigDecimal("5999"), 35, 4.4, 6200,
                        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60",
                        true, false, "shoes,running,nike,sports"),

                new Product("Samsung Galaxy A54 5G (8GB | 128GB)", "Mobiles & Tablets", "Smartphones", "Samsung",
                        new BigDecimal("24999"), new BigDecimal("49999"), 50, 4.5, 11600,
                        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60",
                        true, false, "smartphone,samsung,5g,mobile"),

                new Product("Safari Laptop Backpack (30L)", "Fashion", "Bags", "Safari",
                        new BigDecimal("1199"), new BigDecimal("2999"), 60, 4.3, 9800,
                        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60",
                        true, false, "backpack,laptop,safari,travel"),

                new Product("Puma Unisex Sneakers", "Fashion", "Footwear", "Puma",
                        new BigDecimal("2899"), new BigDecimal("4999"), 42, 4.4, 7100,
                        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&auto=format&fit=crop&q=60",
                        true, false, "sneakers,puma,shoes,fashion"),

                // AI Recommended for You (exact items from screenshot)
                new Product("OnePlus Nord CE 4 5G", "Mobiles & Tablets", "Smartphones", "OnePlus",
                        new BigDecimal("24999"), new BigDecimal("26999"), 7, 4.4, 9200,
                        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60",
                        false, true, "smartphone,oneplus,5g,mobile"),

                new Product("Sony WH-CH520 Wireless Headphones", "Electronics", "Audio", "Sony",
                        new BigDecimal("3990"), new BigDecimal("4990"), 20, 4.3, 5100,
                        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
                        false, true, "headphones,sony,wireless,audio"),

                new Product("Levi's Men Slim Fit Jeans", "Fashion", "Clothing", "Levi's",
                        new BigDecimal("2499"), new BigDecimal("3299"), 24, 4.2, 3800,
                        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=60",
                        false, true, "jeans,levis,clothing,fashion"),

                new Product("Adidas Backpack", "Sports, Fitness & Outdoors", "Bags", "Adidas",
                        new BigDecimal("1799"), new BigDecimal("2499"), 28, 4.4, 2600,
                        "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&auto=format&fit=crop&q=60",
                        false, true, "backpack,adidas,bag,sports"),

                new Product("The Psychology of Money", "Books & Stationery", "Books", "Morgan Housel",
                        new BigDecimal("399"), new BigDecimal("499"), 20, 4.7, 12000,
                        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60",
                        false, true, "book,finance,reading,bestseller"),

                new Product("Milton Water Bottle (1L)", "Home & Kitchen", "Drinkware", "Milton",
                        new BigDecimal("699"), new BigDecimal("899"), 22, 4.5, 8400,
                        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60",
                        false, true, "bottle,milton,kitchen,drinkware"),

                // Hero & Other Featured
                new Product("Apple iPhone 15 (128 GB) - Blue", "Mobiles & Tablets", "Smartphones", "Apple",
                        new BigDecimal("71999"), new BigDecimal("79900"), 10, 4.8, 25400,
                        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60",
                        false, false, "apple,iphone,smartphone,ios"),

                new Product("MacBook Air M2 13-inch (16GB RAM, 512GB SSD)", "Laptops & Accessories", "Laptops", "Apple",
                        new BigDecimal("99990"), new BigDecimal("114900"), 13, 4.9, 8700,
                        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60",
                        false, false, "laptop,macbook,apple,productivity")
            );
            productRepository.saveAll(seedProducts);
        }
    }
}
