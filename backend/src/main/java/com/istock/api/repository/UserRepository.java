//package com.istock.api.repository;
//
//import com.istock.api.model.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//public interface UserRepository extends JpaRepository<User, String> {
//    Optional<User> findByEmail(String email);
//    List<User> findByStatus(String status);
//    List<User> findByRole(String role);
//    long countByStatus(String status);
//    long countByStatusAndCreatedAtBefore(String status, LocalDateTime date);
//}
