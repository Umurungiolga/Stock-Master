package com.istock.api.repository;

import com.istock.api.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    List<Product> findByStockLessThanEqual(int stock);
    List<Product> findByCategory(String category);
    long countByCreatedAtBefore(LocalDateTime date);
}
