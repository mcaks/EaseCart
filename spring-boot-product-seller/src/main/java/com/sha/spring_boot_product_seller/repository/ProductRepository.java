package com.sha.spring_boot_product_seller.repository;

import com.sha.spring_boot_product_seller.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
}
