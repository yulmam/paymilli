package com.paymilli.paymilli.domain.payment.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PaymentResponse {

    private String cardId;
    private String cardName;
    private int installment;
    private int chargePrice;
    private String approveNumber;
}
