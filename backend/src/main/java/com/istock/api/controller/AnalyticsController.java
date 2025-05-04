package com.istock.api.controller;

import com.istock.api.model.dto.DashboardStats;
import com.istock.api.service.AnalyticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@Tag(name = "Analytics API", description = "Endpoints for retrieving analytics and dashboard statistics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/dashboard")
    @Operation(summary = "Get dashboard statistics", description = "Retrieves key statistics for the dashboard, such as total sales, orders, and products")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved dashboard statistics"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<DashboardStats> getDashboardStats() {
        return ResponseEntity.ok(analyticsService.getDashboardStats());
    }

    @GetMapping("/sales")
    @Operation(summary = "Get sales data", description = "Retrieves sales data for analysis, including revenue and order trends")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved sales data"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<List<Map<String, Object>>> getSalesData() {
        return ResponseEntity.ok(analyticsService.getSalesData());
    }

    @GetMapping("/products/performance")
    @Operation(summary = "Get product performance", description = "Retrieves performance metrics for products, such as sales volume and revenue")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved product performance data"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<List<Map<String, Object>>> getProductPerformance() {
        return ResponseEntity.ok(analyticsService.getProductPerformance());
    }

    @GetMapping("/inventory/trends")
    @Operation(summary = "Get inventory trends", description = "Retrieves trends in inventory levels over time")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved inventory trends"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<List<Map<String, Object>>> getInventoryTrends() {
        return ResponseEntity.ok(analyticsService.getInventoryTrends());
    }

    @GetMapping("/customers")
    @Operation(summary = "Get customer metrics", description = "Retrieves metrics about customers, such as purchase history and activity")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved customer metrics"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<List<Map<String, Object>>> getCustomerMetrics() {
        return ResponseEntity.ok(analyticsService.getCustomerMetrics());
    }
}