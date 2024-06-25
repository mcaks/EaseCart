package com.ecommerce.easecart.service;

import com.ecommerce.easecart.model.BrandRequest;
import com.ecommerce.easecart.model.BrandResponse;
import com.ecommerce.easecart.model.TypeRequest;
import com.ecommerce.easecart.model.TypeResponse;

import java.util.List;

public interface TypeService {
    List<TypeResponse> getAllTypes();

    TypeResponse addType(TypeRequest typeRequest);
}
