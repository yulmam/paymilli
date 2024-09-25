package com.cardcompany.cardcompany.domain.transaction.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PayRequest {

    private String storeName;
    private long price;
    private String cardNumber;
    private String cvc;
    private String expirationDate;
    private int installment;
}
