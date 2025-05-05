package com.istock.api.Response;




import lombok.*;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private String name;
    private String email;
    private String phone;
    public UUID id;


}


