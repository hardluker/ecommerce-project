package com.dba9514.ecommerce.controller;

import com.dba9514.ecommerce.dto.Purchase;
import com.dba9514.ecommerce.dto.PurchaseResponse;
import com.dba9514.ecommerce.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    @Autowired
    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {
        //Delegating to the checkoutService
        return checkoutService.placeOrder(purchase);
    }
}
