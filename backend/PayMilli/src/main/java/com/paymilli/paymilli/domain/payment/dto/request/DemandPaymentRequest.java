package com.paymilli.paymilli.domain.payment.dto.request;

import java.util.List;
import lombok.Getter;

@Getter
public class DemandPaymentRequest {

    private String storeName;
    private int price;
    private String detail;
    private List<DemandPaymentCardRequest> paymentCards;
}
