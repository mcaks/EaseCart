package com.ecommerce.easecart.entitiy;

import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class Basket {
    @Id
    private String id;
    private List<BasketItem> items = new ArrayList<>();
    public Basket(String id) {
        this.id = id;
    }
}
