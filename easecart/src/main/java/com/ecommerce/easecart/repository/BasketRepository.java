package com.ecommerce.easecart.repository;

import com.ecommerce.easecart.entity.Basket;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasketRepository extends CrudRepository<Basket, String> {
}
