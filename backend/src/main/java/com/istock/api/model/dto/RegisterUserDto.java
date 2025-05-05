package com.istock.api.model.dto;





import lombok.*;

@Data
public class RegisterUserDto {
    private String name;
    private String email;
    private String password;
    private String role;
    private  String status;

}


