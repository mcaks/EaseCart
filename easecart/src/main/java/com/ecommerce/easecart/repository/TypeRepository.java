package com.ecommerce.easecart.repository;

import com.ecommerce.easecart.entitiy.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeRepository extends JpaRepository<Type, Integer> {
}

