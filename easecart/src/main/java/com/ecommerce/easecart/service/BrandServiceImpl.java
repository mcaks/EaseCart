package com.ecommerce.easecart.service;

import com.ecommerce.easecart.entity.Brand;
import com.ecommerce.easecart.model.BrandRequest;
import com.ecommerce.easecart.model.BrandResponse;
import com.ecommerce.easecart.repository.BrandRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class BrandServiceImpl implements BrandService {
    private final BrandRepository brandRepository;

    public BrandServiceImpl(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    @Override
    public List<BrandResponse> getAllBrands() {
        log.info("Fetching All Brands!!!");
        List<Brand> brandList = brandRepository.findAll();
        List<BrandResponse> brandResponses = brandList.stream()
                .map(this::convertToBrandResponse)
                .collect(Collectors.toList());
        log.info("Fetched All Brands!!!");
        return brandResponses;
    }

    @Override
    public BrandResponse addBrand(BrandRequest brandRequest) {
        log.info("Adding new brand: {}", brandRequest.getName());
        Brand brand = new Brand();
        brand.setName(brandRequest.getName());
        Brand savedBrand = brandRepository.save(brand);
        BrandResponse brandResponse = convertToBrandResponse(savedBrand);
        log.info("Brand added: {}", brandResponse.getName());
        return brandResponse;
    }

    private BrandResponse convertToBrandResponse(Brand brand) {
        return BrandResponse.builder()
                .id(brand.getId())
                .name(brand.getName())
                .build();
    }
}
