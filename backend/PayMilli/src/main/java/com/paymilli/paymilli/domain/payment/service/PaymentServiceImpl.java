package com.paymilli.paymilli.domain.payment.service;

import com.paymilli.paymilli.domain.payment.dto.request.ApprovePaymentRequest;
import com.paymilli.paymilli.domain.payment.dto.request.DemandPaymentRequest;
import com.paymilli.paymilli.domain.payment.dto.request.RefundPaymentRequest;
import com.paymilli.paymilli.domain.payment.dto.response.PaymentResponse;
import com.paymilli.paymilli.domain.payment.dto.response.SearchPaymentGroupResponse;
import java.time.LocalDate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class PaymentServiceImpl implements PaymentService {


    @Override
    public String issueTransactionId(DemandPaymentRequest demandPaymentRequest) {
        return "";
    }

    @Override
    public void approvePayment(String token, String transactionId,
        ApprovePaymentRequest approvePaymentRequest) {

    }

    @Override
    public SearchPaymentGroupResponse searchPaymentGroup(String token, int sort, int page, int size,
        LocalDate startDate, LocalDate endDate) {
        return null;
    }

    @Override
    public PaymentResponse getPayment(String paymentId) {
        return null;
    }

    @Override
    public void refundPayment(RefundPaymentRequest refundPaymentRequest) {

    }
}
