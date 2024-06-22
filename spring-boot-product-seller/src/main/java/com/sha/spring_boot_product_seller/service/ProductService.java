package com.sha.spring_boot_product_seller.service;

import com.sha.spring_boot_product_seller.model.Product;

import java.util.List;

public interface ProductService {
    Product saveProduct(Product product);

    void deleteProduct(Long id);

    List<Product> findAllProducts();
}
