package com.ecommerce.easecart.service;

import com.ecommerce.easecart.entity.Basket;
import com.ecommerce.easecart.model.BasketResponse;

import java.util.List;

public interface BasketService {
    List<BasketResponse> getAllBaskets();

    BasketResponse getBasketById(String basketId);

    void deleteBasketById(String basketId);

    BasketResponse createBasket(Basket basket);
}
