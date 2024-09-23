package com.paymilli.paymilli.domain.payment.dto.response;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PaymentResponse {

    private String id;
    private String storeName;
    private int price;
    private LocalDateTime date;
    private String approveNumber;
    private List<PaymentCardResponse> paymentCardResponse;
}
