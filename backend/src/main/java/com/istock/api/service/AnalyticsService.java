package com.istock.api.service;

import com.istock.api.model.Order;
import com.istock.api.model.Product;
import com.istock.api.model.User;
import com.istock.api.model.dto.DashboardStats;
import com.istock.api.repository.OrderRepository;
import com.istock.api.repository.ProductRepository;
import com.istock.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public DashboardStats getDashboardStats() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfMonth = now.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime startOfPrevMonth = startOfMonth.minusMonths(1);

        List<Order> currentMonthOrders = orderRepository.findByCreatedAtBetween(startOfMonth, now);
        List<Order> prevMonthOrders = orderRepository.findByCreatedAtBetween(startOfPrevMonth, startOfMonth);

        BigDecimal currentRevenue = currentMonthOrders.stream()
                .map(Order::getTotal)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal prevRevenue = prevMonthOrders.stream()
                .map(Order::getTotal)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        double revenueGrowth = calculateGrowth(prevRevenue, currentRevenue);

        long totalProducts = productRepository.count();
        long totalOrders = currentMonthOrders.size();
        long activeUsers = userRepository.countByStatus("Active");

        LocalDateTime startOfPrevMonthEnd = startOfMonth.minusSeconds(1);
        long prevMonthProducts = productRepository.countByCreatedAtBefore(startOfMonth);
        long prevMonthOrderCount = prevMonthOrders.size(); // Use distinct variable name
        long prevMonthUsers = userRepository.countByStatusAndCreatedAtBefore("Active", startOfMonth);

        double productGrowth = calculateGrowth((int) prevMonthProducts, (int) totalProducts);
        double orderGrowth = calculateGrowth((int) prevMonthOrderCount, (int) totalOrders);
        double userGrowth = calculateGrowth((int) prevMonthUsers, (int) activeUsers);

        return new DashboardStats(
                currentRevenue,
                (int) totalProducts,
                (int) totalOrders,
                (int) activeUsers,
                revenueGrowth,
                productGrowth,
                orderGrowth,
                userGrowth
        );
    }

    public List<Map<String, Object>> getSalesData() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime oneYearAgo = now.minusYears(1);

        List<Order> orders = orderRepository.findByCreatedAtBetween(oneYearAgo, now);

        Map<String, BigDecimal> monthlySales = new LinkedHashMap<>();
        Map<String, BigDecimal> monthlyTargets = new LinkedHashMap<>();

        for (int i = 0; i < 12; i++) {
            LocalDateTime date = now.minusMonths(i);
            String month = date.getMonth().toString().substring(0, 3);
            monthlySales.put(month, BigDecimal.ZERO);
            monthlyTargets.put(month, BigDecimal.valueOf(5000 + Math.random() * 2000));
        }

        for (Order order : orders) {
            String month = order.getCreatedAt().getMonth().toString().substring(0, 3);
            BigDecimal total = order.getTotal() != null ? order.getTotal() : BigDecimal.ZERO;
            monthlySales.put(month, monthlySales.getOrDefault(month, BigDecimal.ZERO).add(total));
        }

        List<Map<String, Object>> result = new ArrayList<>();
        for (String month : monthlySales.keySet()) {
            Map<String, Object> entry = new HashMap<>();
            entry.put("month", month);
            entry.put("sales", monthlySales.get(month));
            entry.put("target", monthlyTargets.get(month));
            result.add(entry);
        }

        Collections.reverse(result);
        return result;
    }

    public List<Map<String, Object>> getProductPerformance() {
        List<Product> products = productRepository.findAll();
        List<Order> recentOrders = orderRepository.findByCreatedAtBetween(
                LocalDateTime.now().minusMonths(3),
                LocalDateTime.now()
        );

        Map<String, BigDecimal> productRevenue = new HashMap<>();
        for (Order order : recentOrders) {
            order.getItems().forEach(item -> {
                String productId = item.getProductId();
                BigDecimal itemTotal = item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
                productRevenue.put(productId, productRevenue.getOrDefault(productId, BigDecimal.ZERO).add(itemTotal));
            });
        }

        List<Map<String, Object>> result = new ArrayList<>();
        for (Product product : products) {
            if (productRevenue.containsKey(product.getId())) {
                Map<String, Object> entry = new HashMap<>();
                entry.put("name", product.getName());
                entry.put("revenue", productRevenue.get(product.getId()));
                result.add(entry);
            }
        }

        result.sort((a, b) -> ((BigDecimal) b.get("revenue")).compareTo((BigDecimal) a.get("revenue")));
        return result.stream().limit(5).collect(Collectors.toList());
    }

    public List<Map<String, Object>> getInventoryTrends() {
        List<Map<String, Object>> result = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();

        for (int i = 0; i < 12; i++) {
            LocalDateTime date = now.minusMonths(i);
            String month = date.getMonth().toString().substring(0, 3);
            Map<String, Object> entry = new HashMap<>();
            entry.put("month", month);
            entry.put("stock", 100 + (int) (Math.sin(i * 0.5) * 50) + (int) (Math.random() * 20));
            result.add(entry);
        }

        Collections.reverse(result);
        return result;
    }

    public List<Map<String, Object>> getCustomerMetrics() {
        List<Map<String, Object>> result = new ArrayList<>();

        Map<String, Object> newCustomers = new HashMap<>();
        newCustomers.put("name", "New Customers");
        newCustomers.put("value", 540);
        newCustomers.put("color", "#3b82f6");
        result.add(newCustomers);

        Map<String, Object> returningCustomers = new HashMap<>();
        returningCustomers.put("name", "Returning Customers");
        returningCustomers.put("value", 620);
        returningCustomers.put("color", "#10b981");
        result.add(returningCustomers);

        Map<String, Object> inactiveCustomers = new HashMap<>();
        inactiveCustomers.put("name", "Inactive Customers");
        newCustomers.put("value", 210);
        newCustomers.put("color", "#f59e0b");
        result.add(inactiveCustomers);

        return result;
    }

    private double calculateGrowth(int previous, int current) {
        if (previous == 0) return 100.0;
        return ((double) (current - previous) / previous) * 100.0;
    }

    private double calculateGrowth(BigDecimal previous, BigDecimal current) {
        if (previous.compareTo(BigDecimal.ZERO) == 0) return 100.0;
        return current.subtract(previous)
                .divide(previous, 4, BigDecimal.ROUND_HALF_UP)
                .multiply(BigDecimal.valueOf(100))
                .doubleValue();
    }
}
