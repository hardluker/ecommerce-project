package com.dba9514.ecommerce.service;

import com.dba9514.ecommerce.dto.Purchase;
import com.dba9514.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
