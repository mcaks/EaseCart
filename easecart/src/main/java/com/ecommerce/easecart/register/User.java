package com.ecommerce.easecart.register;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;

    @Column(name = "Name")
    private String name;

    @Column(name = "Email", unique = true)
    private String email;

    @Column(name = "Password")
    private String password;

    @Column(name = "Address")
    private String address;

    @Column(name = "Country")
    private String country;

    @Column(name = "Post")
    private String post;
}
