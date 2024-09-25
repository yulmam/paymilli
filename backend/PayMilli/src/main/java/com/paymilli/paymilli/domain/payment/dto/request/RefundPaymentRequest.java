package com.paymilli.paymilli.domain.payment.dto.request;

import java.util.UUID;
import lombok.Getter;

@Getter
public class RefundPaymentRequest {

    private UUID paymentId;
}
