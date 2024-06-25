package com.ecommerce.easecart.service;

import com.ecommerce.easecart.entity.Brand;
import com.ecommerce.easecart.entity.Product;
import com.ecommerce.easecart.entity.Type;
import com.ecommerce.easecart.exceptions.ProductNotFoundException;
import com.ecommerce.easecart.model.ProductRequest;
import com.ecommerce.easecart.model.ProductResponse;
import com.ecommerce.easecart.repository.BrandRepository;
import com.ecommerce.easecart.repository.ProductRepository;
import com.ecommerce.easecart.repository.TypeRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;
    private final TypeRepository typeRepository;

    public ProductServiceImpl(ProductRepository productRepository, BrandRepository brandRepository,
            TypeRepository typeRepository) {
        this.productRepository = productRepository;
        this.brandRepository = brandRepository;
        this.typeRepository = typeRepository;
    }

    @Override
    public ProductResponse getProductById(Integer productId) {
        log.info("fetching Product by Id: {}", productId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product doesn't exist"));
        ProductResponse productResponse = convertToProductResponse(product);
        log.info("Fetched Product by Product Id: {}", productId);
        return productResponse;
    }

    @Override
    public Page<ProductResponse> getProducts(Pageable pageable, Integer brandId, Integer typeId, String keyword) {
        Specification<Product> spec = Specification.where(null);

        if (brandId != null) {
            spec = spec
                    .and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("brand").get("id"), brandId));
        }

        if (typeId != null) {
            spec = spec
                    .and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("type").get("id"), typeId));
        }

        if (keyword != null && !keyword.isEmpty()) {
            spec = spec
                    .and((root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("name"), "%" + keyword + "%"));
        }

        return productRepository.findAll(spec, pageable).map(this::convertToProductResponse);
    }

    @Override
    public ProductResponse addProduct(ProductRequest productRequest) {
        Brand brand = brandRepository.findById(productRequest.getBrandId())
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));
        Type type = typeRepository.findById(productRequest.getTypeId())
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));

        Product product = Product.builder()
                .name(productRequest.getName())
                .description(productRequest.getDescription())
                .price(productRequest.getPrice())
                .pictureUrl(productRequest.getPictureUrl())
                .brand(brand)
                .type(type)
                .build();

        productRepository.save(product);
        return convertToProductResponse(product);
    }

    private ProductResponse convertToProductResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .pictureUrl(product.getPictureUrl())
                .productBrand(product.getBrand().getName())
                .productType(product.getType().getName())
                .build();
    }
}
