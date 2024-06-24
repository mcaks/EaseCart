package com.sha.spring_boot_product_seller.service;

import com.sha.spring_boot_product_seller.model.User;

public interface AuthenticatonService {
    User signInAndReturnJWT(User signInRequest);
}
