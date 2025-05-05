//package com.istock.api.service;
//
//import com.istock.api.model.User;
//import com.istock.api.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class UserService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private BCryptPasswordEncoder passwordEncoder;
//
//    public List<User> getAllUsers() {
//        return userRepository.findAll();
//    }
//
//    public Optional<User> getUserById(String id) {
//        return userRepository.findById(id);
//    }
//
//    public Optional<User> getUserByEmail(String email) {
//        return userRepository.findByEmail(email);
//    }
//
//    public User saveUser(User user) {
//        // Only encode password if it's a new user or password has been changed
//        if (user.getId() == null || user.getPassword() != null && !user.getPassword().startsWith("$2a$")) {
//            user.setPassword(passwordEncoder.encode(user.getPassword()));
//        }
//        return userRepository.save(user);
//    }
//
//    public void deleteUser(String id) {
//        userRepository.deleteById(id);
//    }
//
//    public List<User> getUsersByStatus(String status) {
//        return userRepository.findByStatus(status);
//    }
//
//    public List<User> getUsersByRole(String role) {
//        return userRepository.findByRole(role);
//    }
//}

package com.istock.api.service;


import com.istock.api.Response.ApiResponse;
import com.istock.api.model.User;
import com.istock.api.model.dto.LoginDto;
import com.istock.api.model.dto.LoginRequest;
import com.istock.api.model.dto.RegisterUserDto;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface UserService {
    ApiResponse<Object> createAccount(RegisterUserDto user) throws  Exception;
    List<User> getAllUsers() throws  Exception;

    ApiResponse<Object> loginUser(LoginDto dto) throws Exception;

    ApiResponse<Object> logoutUser(HttpServletRequest request) throws Exception;

//    ApiResponse<Object> resetPassword(ResetPasswordDto dto) throws  Exception;

}


