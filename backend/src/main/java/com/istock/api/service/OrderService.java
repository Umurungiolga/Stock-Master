package com.istock.api.service;

import com.istock.api.model.Order;
import com.istock.api.model.OrderItem;
import com.istock.api.model.Product;
import com.istock.api.repository.OrderRepository;
import com.istock.api.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }

    @Transactional
    public Order saveOrder(Order order) {
        // If this is a new order, update product stock
        if (order.getId() == null) {
            for (OrderItem item : order.getItems()) {
                Optional<Product> productOpt = productRepository.findById(item.getProductId());
                if (productOpt.isPresent()) {
                    Product product = productOpt.get();
                    int newStock = product.getStock() - item.getQuantity();
                    if (newStock < 0) {
                        throw new IllegalArgumentException("Insufficient stock for product: " + product.getName());
                    }
                    product.setStock(newStock);
                    productRepository.save(product);
                }
            }
        }
        return orderRepository.save(order);
    }

    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }

    public List<Order> getOrdersByStatus(String status) {
        return orderRepository.findByStatus(status);
    }

    public List<Order> getOrdersByDateRange(LocalDateTime start, LocalDateTime end) {
        return orderRepository.findByCreatedAtBetween(start, end);
    }

    public List<Order> getOrdersByCustomer(String email) {
        return orderRepository.findByCustomerEmail(email);
    }
}
