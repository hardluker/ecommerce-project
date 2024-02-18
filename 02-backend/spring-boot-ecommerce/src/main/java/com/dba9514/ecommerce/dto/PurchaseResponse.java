package com.dba9514.ecommerce.dto;

import lombok.Data;

@Data
public class PurchaseResponse {

    //@Data only generates the constructor for final variables. Alternative is to use @NonNull
    private final String orderTrackingNumber;

}
