package com.ecommerce.easecart.service;

import com.ecommerce.easecart.entity.Brand;
import com.ecommerce.easecart.entity.Type;
import com.ecommerce.easecart.model.BrandRequest;
import com.ecommerce.easecart.model.BrandResponse;
import com.ecommerce.easecart.model.TypeRequest;
import com.ecommerce.easecart.model.TypeResponse;
import com.ecommerce.easecart.repository.TypeRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class TypeServiceImpl implements TypeService {
    private final TypeRepository typeRepository;

    public TypeServiceImpl(TypeRepository typeRepository) {
        this.typeRepository = typeRepository;
    }

    @Override
    public List<TypeResponse> getAllTypes() {
        log.info("Fetching All Types!!!");
        // Fetch Types from DB
        List<Type> typeList = typeRepository.findAll();
        // now use stream operator to map with Response
        List<TypeResponse> typeResponses = typeList.stream()
                .map(this::convertToTypeResponse)
                .collect(Collectors.toList());
        return typeResponses;
    }

    @Override
    public TypeResponse addType(TypeRequest typeRequest) {

        log.info("Adding new type: {}", typeRequest.getName());
        Type type = new Type();
        type.setName(typeRequest.getName());
        Type savedType = typeRepository.save(type);
        TypeResponse typeResponse = convertToTypeResponse(savedType);
        log.info("Type added: {}", typeResponse.getName());
        return typeResponse;
    }

    private TypeResponse convertToTypeResponse(Type type) {
        return TypeResponse.builder()
                .id(type.getId())
                .name(type.getName())
                .build();
    }
}
