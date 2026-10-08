package com.shopsmart.order.repository;

import com.shopsmart.order.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByOrderNumber(String orderNumber);
    List<Order> findByCustomerEmailOrderByOrderDateDesc(String customerEmail);
    List<Order> findAllByOrderByOrderDateDesc();
}
