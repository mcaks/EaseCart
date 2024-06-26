package com.ecommerce.easecart.service;

import com.ecommerce.easecart.model.BrandRequest;
import com.ecommerce.easecart.model.BrandResponse;

import java.util.List;

public interface BrandService {
    List<BrandResponse> getAllBrands();

    BrandResponse addBrand(BrandRequest brandRequest); // New method to add a brand
    //void deleteBrand(Integer brandId);
}
