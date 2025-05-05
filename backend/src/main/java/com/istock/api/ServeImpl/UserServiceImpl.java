package com.istock.api.ServeImpl;


import com.istock.api.Exceptions.ResourceNotFoundException;
import com.istock.api.Repositories.UserRepository;
import com.istock.api.Response.ApiResponse;
import com.istock.api.model.User;
import com.istock.api.model.dto.LoginDto;
import com.istock.api.model.dto.LoginRequest;
import com.istock.api.model.dto.RegisterUserDto;
import com.istock.api.model.dto.ResetPasswordDto;
import com.istock.api.service.JwtService;
import com.istock.api.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public ApiResponse<Object> createAccount(RegisterUserDto user) throws Exception {
        try {

            if (user.getEmail() == null || user.getName() == null
                    || user.getPassword() == null) {
                throw new Exception("All details are required please!");
            }


            // Check if the account exists
            Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
            if (existingUser.isPresent()) {
                return ApiResponse.builder()
                        .data("Account already exists. Please login or use another email to continue.")
                        .success(false)
                        .build();
            }

            // Create a new account for user
            User newUser =new  User();
            newUser.setEmail(user.getEmail());
            newUser.setPassword(passwordEncoder.encode(user.getPassword()));
            newUser.setName(user.getName());
            newUser.setRole(user.getRole() != null ? user.getRole() : "USER");
            newUser.setStatus(user.getStatus() != null ? user.getStatus() : "ACTIVE");


            // Save the new account for user
            User savedUser = userRepository.save(newUser);

            // Return success response
            return ApiResponse.builder()
                    .data(savedUser)
                    .success(true)
                    .build();

        } catch (Exception e) {
            throw new Exception("Internal server error: " + e.getMessage());
        }
    }
    @Override
    @Transactional
    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();
        // Ensure lazy-loaded collections (like posts) are initialized
//        users.forEach(user -> user.getPosts().size());
        return users;
    }

    @Override
    public ApiResponse<Object> loginUser(LoginDto dto) throws BadRequestException, AuthenticationException {
        // Validate input
        if (dto.getEmail()==null || dto.getPassword()==null) {
            throw new BadRequestException("Email and password are required");
        }

        try {
            // Authenticate
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
            );

            // Get user details
            User user = (User) authentication.getPrincipal();

            // Generate token
            String token = jwtService.generateToken(user);

            return ApiResponse.builder()
                    .success(true)
                    .data(Map.of(
                            "access_token", token,
                            "user_id", user.getId()
                    ))
                    .message("Login successful")
                    .status(HttpStatus.OK)
                    .build();

        } catch (BadCredentialsException ex) {
            throw new AuthenticationException("Invalid email or password");
        }
    }


    public ApiResponse<Object> logoutUser(HttpServletRequest request) {
        // Clear the security context
        SecurityContextHolder.clearContext();

        // Get the JWT token from the request header
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            // Invalidate the token
            jwtService.invalidateToken(token);
        }

        return ApiResponse.builder()
                .success(true)
                .data(null)
                .message("Logged out successfully")
                .status(HttpStatus.OK)
                .build();
    }

    public ApiResponse<Object> resetPassword(ResetPasswordDto dto) {
        // Validate input parameters
        if (dto.getEmail() == null || dto.getEmail().isBlank()) {
            return ApiResponse.builder()
                    .success(false)
                    .message("Email  is required")
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }

        try {
            // Find user by email
            User user = userRepository.findByEmail(dto.getEmail())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));

            // Validate password match
            if (!Objects.equals(dto.getNew_password(), dto.getConfirm_password())) {
                return ApiResponse.builder()
                        .success(false)
                        .message("Password and confirmation do not match")
                        .status(HttpStatus.BAD_REQUEST)
                        .build();
            }

            // Validate password strength
            if (!isPasswordValid(dto.getNew_password())) {
                return ApiResponse.builder()
                        .success(false)
                        .message("Password does not meet security requirements")
                        .status(HttpStatus.BAD_REQUEST)
                        .build();
            }

            // Update and save user
            user.setPassword(passwordEncoder.encode(dto.getNew_password()));
            User savedUser = userRepository.save(user);

            return ApiResponse.builder()
                    .success(true)
                    .data(savedUser)
                    .message("Password reset successfully")
                    .status(HttpStatus.OK)
                    .build();

        } catch (ResourceNotFoundException ex) {
            return ApiResponse.builder()
                    .success(false)
                    .message(ex.getMessage())
                    .status(HttpStatus.NOT_FOUND)
                    .build();
        } catch (Exception ex) {
            return ApiResponse.builder()
                    .success(false)
                    .message("Failed to reset password. Please try again later.")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }

    private boolean isPasswordValid(String password) {
        return password != null && password.length() >= 8;
    }

}


