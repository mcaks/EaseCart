package com.sha.spring_boot_product_seller.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name="product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name", nullable = false)
    private String name;
    @Column(name="description", nullable = false)
    private String description;

    @Column(name="price", nullable = false)
    private String price;

    @Column(name="create_time", nullable = false)
    private LocalDateTime createTime;

}
