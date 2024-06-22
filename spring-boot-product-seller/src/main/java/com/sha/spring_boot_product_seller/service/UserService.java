package com.sha.spring_boot_product_seller.service;

import com.sha.spring_boot_product_seller.model.Role;
import com.sha.spring_boot_product_seller.model.User;
import jakarta.transaction.Transactional;

import java.util.Optional;

public interface UserService {
    User saveUser(User user);

    Optional<User> findByUsername(String username);

    @Transactional
    void changeRole(Role newRole, String username);
}
