package com.shopsmart.order.service;

import com.shopsmart.order.client.InventoryClient;
import com.shopsmart.order.model.Order;
import com.shopsmart.order.model.OrderItem;
import com.shopsmart.order.repository.OrderRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final InventoryClient inventoryClient;

    public OrderService(OrderRepository orderRepository, InventoryClient inventoryClient) {
        this.orderRepository = orderRepository;
        this.inventoryClient = inventoryClient;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByOrderDateDesc();
    }

    public Order getOrderByNumber(String orderNumber) {
        return orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new RuntimeException("Order not found with number: " + orderNumber));
    }

    public List<Order> getOrdersByCustomerEmail(String email) {
        return orderRepository.findByCustomerEmailOrderByOrderDateDesc(email);
    }

    @Transactional
    public Order placeOrder(Order order) {
        if (order.getOrderNumber() == null || order.getOrderNumber().isEmpty()) {
            order.setOrderNumber("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(Order.OrderStatus.CONFIRMED);

        // Deduct inventory across microservice for each ordered item
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                inventoryClient.deductStock(item.getProductId(), item.getQuantity());
            }
        }

        return orderRepository.save(order);
    }

    public Order updateOrderStatus(Long id, Order.OrderStatus status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    @PostConstruct
    public void seedInitialOrders() {
        if (orderRepository.count() == 0) {
            Order order1 = new Order();
            order1.setOrderNumber("ORD-8921A30F");
            order1.setCustomerName("Omprakash");
            order1.setCustomerEmail("omprakash@example.com");
            order1.setDeliveryAddress("Flat 402, Sunshine Heights, Hinjawadi Phase 1");
            order1.setPincode("411001");
            order1.setTotalAmount(new BigDecimal("2899"));
            order1.setPaymentMethod("UPI (Google Pay)");
            order1.setStatus(Order.OrderStatus.DELIVERED);

            OrderItem item1 = new OrderItem(2L, "Noise ColorFit Pulse 3 Smart Watch",
                    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
                    1, new BigDecimal("2899"));
            order1.setItems(List.of(item1));

            orderRepository.save(order1);
        }
    }
}
