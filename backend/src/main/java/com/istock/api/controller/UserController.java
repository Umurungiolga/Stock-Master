//package com.istock.api.controller;
//
//import com.istock.api.model.User;
//import com.istock.api.service.UserService;
//import io.swagger.v3.oas.annotations.Operation;
//import io.swagger.v3.oas.annotations.responses.ApiResponse;
//import io.swagger.v3.oas.annotations.responses.ApiResponses;
//import io.swagger.v3.oas.annotations.tags.Tag;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/users")
//@Tag(name = "User API", description = "Endpoints for managing users in the stock management system")
//public class UserController {
//
//    @Autowired
//    private UserService userService;
//
//    @GetMapping
//    @Operation(summary = "Get all users", description = "Retrieves a list of all users")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "Successfully retrieved users"),
//            @ApiResponse(responseCode = "500", description = "Internal server error")
//    })
//    public ResponseEntity<List<User>> getAllUsers() throws Exception {
//        return ResponseEntity.ok(userService.getAllUsers());
//    }
//
//    @GetMapping("/{id}")
//    @Operation(summary = "Get user by ID", description = "Retrieves a specific user by their ID")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "Successfully retrieved user"),
//            @ApiResponse(responseCode = "404", description = "User not found")
//    })
//    public ResponseEntity<User> getUserById(@PathVariable String id) {
//        return userService.getUserById(id)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    @PostMapping
//    @Operation(summary = "Create a new user", description = "Creates a new user in the system")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "201", description = "User created successfully"),
//            @ApiResponse(responseCode = "400", description = "Invalid user data")
//    })
//    public ResponseEntity<User> createUser(@RequestBody User user) {
//        return new ResponseEntity<>(userService.saveUser(user), HttpStatus.CREATED);
//    }
//
//    @PutMapping("/{id}")
//    @Operation(summary = "Update a user", description = "Updates an existing user by their ID")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "User updated successfully"),
//            @ApiResponse(responseCode = "404", description = "User not found")
//    })
//    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User user) {
//        return userService.getUserById(id)
//                .map(existingUser -> {
//                    user.setId(id);
//                    return ResponseEntity.ok(userService.saveUser(user));
//                })
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    @DeleteMapping("/{id}")
//    @Operation(summary = "Delete a user", description = "Deletes a user by their ID")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "204", description = "User deleted successfully"),
//            @ApiResponse(responseCode = "404", description = "User not found")
//    })
//    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
//        return userService.getUserById(id)
//                .map(user -> {
//                    userService.deleteUser(id);
//                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
//                })
//                .orElse(ResponseEntity.notFound().build());
//    }
//}
package com.istock.api.controller;




import com.istock.api.Exceptions.UnauthorisedException;
import com.istock.api.Response.ApiResponse;
import com.istock.api.ServeImpl.UserServiceImpl;
import com.istock.api.Utils.GetLoggedUser;
import com.istock.api.Utils.ResponseHandler;
import com.istock.api.model.User;
import com.istock.api.model.dto.LoginDto;
import com.istock.api.model.dto.LoginRequest;
import com.istock.api.model.dto.RegisterUserDto;
import com.istock.api.model.dto.ResetPasswordDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/users")
public class UserController {
    private final UserServiceImpl userServiceImpl;
    private final GetLoggedUser getLoggedUser;

    //this is to register user
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Object>> createNewCompany(@Valid @RequestBody RegisterUserDto dto) throws Exception {
        Object ob = userServiceImpl.createAccount(dto);
        return ResponseHandler.success(ob, HttpStatus.CREATED);
    }

    //this is to login the user
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Object>> loginUser(@Valid @RequestBody LoginDto dto) throws Exception{
        Object ob =  userServiceImpl.loginUser(dto);
        return ResponseHandler.success(ob, HttpStatus.OK);
    }
    @GetMapping("/all_users")
    public ResponseEntity<ApiResponse<List<User>>> listAllUsers() {
        List<User> users = userServiceImpl.getAllUsers();
        return ResponseHandler.success(users, HttpStatus.OK);
    }

    @PutMapping("/reset-password")
    public ResponseEntity<ApiResponse<Object>> resetPassword(@Valid @RequestBody ResetPasswordDto dto) throws  Exception{
        Object user= userServiceImpl.resetPassword(dto);
        return  ResponseHandler.success(user,HttpStatus.OK);
    }

    //this is for logout
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Object>> logoutUser(HttpServletRequest request) {
        ApiResponse<Object> response =  userServiceImpl.logoutUser(request);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    //this is to get the current logged-in user
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<Object>> getCurrentUser() {
        try {
            Object user = getLoggedUser.getLoggedUser();
            return ResponseHandler.success(user, HttpStatus.OK);
        } catch (UnauthorisedException e) {
            return ResponseHandler.error(e.getMessage(), HttpStatus.UNAUTHORIZED);
        } catch (ChangeSetPersister.NotFoundException e) {
            return ResponseHandler.error("User not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return ResponseHandler.error("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
