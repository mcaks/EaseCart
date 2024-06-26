package com.ecommerce.easecart.service;

import com.ecommerce.easecart.model.ProductRequest;
import com.ecommerce.easecart.model.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    ProductResponse getProductById(Integer productId);

    Page<ProductResponse> getProducts(Pageable pageable, Integer brandId, Integer typeId, String keyword);

    ProductResponse addProduct(ProductRequest ProductRequest);
    void deleteProduct(Integer productId);
}
