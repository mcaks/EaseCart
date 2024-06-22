package com.sha.spring_boot_product_seller.repository.projection;

import java.time.LocalDateTime;

public interface PurchaseItem {

    String getName();
    Double getPrice();
    LocalDateTime getPurchaseTime();
}
