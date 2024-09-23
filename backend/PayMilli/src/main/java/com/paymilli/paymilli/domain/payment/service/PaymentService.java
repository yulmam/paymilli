package com.paymilli.paymilli.domain.payment.service;

import com.paymilli.paymilli.domain.payment.dto.request.ApprovePaymentRequest;
import com.paymilli.paymilli.domain.payment.dto.request.DemandPaymentRequest;
import com.paymilli.paymilli.domain.payment.dto.request.RefundPaymentRequest;
import com.paymilli.paymilli.domain.payment.dto.response.PaymentResponse;
import com.paymilli.paymilli.domain.payment.dto.response.SearchPaymentGroupResponse;
import java.time.LocalDate;

public interface PaymentService {

    String issueTransactionId(DemandPaymentRequest demandPaymentRequest);

    void approvePayment(String token, String transactionId,
        ApprovePaymentRequest approvePaymentRequest);

    SearchPaymentGroupResponse searchPaymentGroup(String token, int sort, int page, int size,
        LocalDate startDate, LocalDate endDate);

    PaymentResponse getPayment(String paymentId);

    void refundPayment(RefundPaymentRequest refundPaymentRequest);
}
