package com.paymilli.paymilli.domain.payment.dto.response;

import com.paymilli.paymilli.domain.payment.entity.PaymentStatus;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TransactionResponse {

    private String id;
    private String storeName;
    private String detail;
    private int price;
    private PaymentStatus paymentStatus;
}
