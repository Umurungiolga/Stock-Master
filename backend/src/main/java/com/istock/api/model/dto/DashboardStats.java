package com.istock.api.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStats {
    private BigDecimal totalRevenue;
    private Integer totalProducts;
    private Integer totalOrders;
    private Integer activeUsers;
    private Double revenueGrowth;
    private Double productGrowth;
    private Double orderGrowth;
    private Double userGrowth;
}
