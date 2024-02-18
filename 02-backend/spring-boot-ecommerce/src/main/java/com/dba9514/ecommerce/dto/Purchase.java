package com.dba9514.ecommerce.dto;

import com.dba9514.ecommerce.entities.Customer;
import com.dba9514.ecommerce.entities.Address;
import com.dba9514.ecommerce.entities.Order;
import com.dba9514.ecommerce.entities.OrderItem;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

//Data transfer object for an entire purchase.
@Data
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems = new HashSet<>();

}
