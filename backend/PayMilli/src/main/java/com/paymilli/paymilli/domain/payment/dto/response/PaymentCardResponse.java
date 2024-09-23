package com.paymilli.paymilli.domain.payment.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PaymentCardResponse {

    private String cardId;
    private String cardName;
    private int chargePrice;
}
