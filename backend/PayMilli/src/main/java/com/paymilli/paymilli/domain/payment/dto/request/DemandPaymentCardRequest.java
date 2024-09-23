package com.paymilli.paymilli.domain.payment.dto.request;

import lombok.Getter;

@Getter
public class DemandPaymentCardRequest {

    private String cardId;
    private int cardPrice;
    private int installment;
}
