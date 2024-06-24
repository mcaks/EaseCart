package com.ecommerce.easecart.service;

import com.ecommerce.easecart.model.ProductResponse;

import java.util.List;

public interface ProductService {
    ProductResponse getProductById(Integer productId);
    List<ProductResponse> getProducts();
}