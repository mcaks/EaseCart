package com.ecommerce.easecart.repository;

import com.ecommerce.easecart.entitiy.Basket;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasketRepository extends CrudRepository<Basket, String> {
}
