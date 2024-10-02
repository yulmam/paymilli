package com.paymilli.paymilli.domain.payment.dto.request;

import lombok.Getter;

@Getter
public class RefundPaymentRequest {

    private final String refundToken;

    public RefundPaymentRequest(String refundToken) {
        this.refundToken = refundToken;
    }
}
