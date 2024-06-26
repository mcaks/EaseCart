package com.ecommerce.easecart.register;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private Integer id;
    private String name;
    private String email;
    private String password;
    private String confirmPassword;
    private String address;
    private String country;
    private String post;
}
