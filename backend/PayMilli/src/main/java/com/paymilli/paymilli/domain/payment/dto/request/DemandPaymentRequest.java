package com.paymilli.paymilli.domain.payment.dto.request;

import java.io.Serializable;
import java.util.List;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class DemandPaymentRequest implements Serializable {

    private String storeName;
    private int price;
    private String detail;
    private List<DemandPaymentCardRequest> paymentCards;
}
