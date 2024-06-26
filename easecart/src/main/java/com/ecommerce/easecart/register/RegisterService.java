package com.ecommerce.easecart.register;

import com.ecommerce.easecart.register.RegisterRequest;
import com.ecommerce.easecart.register.RegisterResponse;

public interface RegisterService {
    RegisterResponse registerUser(RegisterRequest registerRequest);
}
