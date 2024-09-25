package com.paymilli.paymilli.domain.payment.service;

import com.paymilli.paymilli.domain.card.entity.Card;
import com.paymilli.paymilli.domain.payment.client.PaymentClient;
import com.paymilli.paymilli.domain.payment.dto.request.cardcompany.PaymentInfoRequest;
import com.paymilli.paymilli.domain.payment.dto.request.cardcompany.PaymentRefundRequest;
import com.paymilli.paymilli.domain.payment.dto.response.cardcompany.PaymentInfoResponse;
import com.paymilli.paymilli.domain.payment.entity.Payment;
import com.paymilli.paymilli.domain.payment.entity.PaymentGroup;
import com.paymilli.paymilli.domain.payment.entity.PaymentStatus;
import com.paymilli.paymilli.domain.payment.exception.PaymentCardException;
import com.paymilli.paymilli.domain.payment.exception.PaymentMilliException;
import com.paymilli.paymilli.domain.payment.repository.PaymentGroupRepository;
import com.paymilli.paymilli.domain.payment.repository.PaymentRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class PaymentDetailServiceImpl implements PaymentDetailService {

    private final PaymentClient paymentClient;
    private final PaymentRepository paymentRepository;
    private final PaymentGroupRepository paymentGroupRepository;

    @Transactional
    @Override
    public boolean requestPaymentGroup(PaymentGroup paymentGroup) {

        // 결제 성공 유무
        boolean paymentSuccess = true;

        int paymentIdx = 0;
        int paymentGroupSize = paymentGroup.getPayments().size();
        String[] approveNumbers = new String[paymentGroupSize];

        log.info("size:" + paymentGroupSize);

        try {
            // 순서대로 결제 진행
            for (; paymentIdx < paymentGroupSize; paymentIdx++) {
                // 결제승인 코드 저장
                approveNumbers[paymentIdx] = requestSinglePayment(
                    paymentGroup.getPayments().get(paymentIdx), paymentGroup.getStoreName());

                log.info(approveNumbers[paymentIdx]);
            }
        } catch (PaymentMilliException e) {
            paymentSuccess = false;

            // 이전 내역 환불 처리
            for (int i = 0; i < paymentIdx; i++) {
                requestSingleRefund(approveNumbers[i]);
            }

        } finally {
            log.info("paymentSuccess : " + paymentSuccess);

            // 성공시 결제 내역 DB 저장
            if (paymentSuccess) {
                paymentGroup.setStatus(PaymentStatus.PAYMENT);
                paymentGroupRepository.save(paymentGroup);

                for (int i = 0; i < paymentGroupSize; i++) {
                    Payment payment = paymentGroup.getPayments().get(i);

                    log.info("approveNumber " + i + " : " + approveNumbers[i]);
                    // 결제 승인번호 주입
                    payment.setApproveNumber(approveNumbers[i]);
                    paymentRepository.save(payment);
                }
            }
        }

        return paymentSuccess;
    }

    private String requestSinglePayment(Payment payment, String storeName)
        throws PaymentMilliException {
        log.info("request init!@@@@@@@@@@@@@@@@@@@@@@@@@");

        Card card = payment.getCard();

        log.info("card: " + card.getCardNumber() + "@@@@@@@@@@@@@@@");

        // 결제 요청
        PaymentInfoResponse response = paymentClient.requestPayment(
            new PaymentInfoRequest(storeName, payment.getPrice(), card.getCardNumber(),
                card.getCVC(),
                card.getExpirationDate(), payment.getInstallment()));

        log.info("response:" + response.getApproveNumber());
        return response.getApproveNumber();
    }


    @Transactional
    @Override
    public boolean refundPaymentGroup(PaymentGroup paymentGroup) {

        int paymentGroupSize = paymentGroup.getPayments().size();

        for (int i = 0; i < paymentGroupSize; i++) {
            requestSingleRefund(paymentGroup.getPayments().get(i).getApproveNumber());
        }

        // 환불 처리
        paymentGroup.setStatus(PaymentStatus.REFUND);

        // 일단 전부 환불 성공 처리
        return true;
    }

    private boolean requestSingleRefund(String approveNumber) {
        log.info(approveNumber);
        try {
            paymentClient.requestRefund(new PaymentRefundRequest(approveNumber));
        } catch (PaymentCardException e) {
            return false;
        }

        return true;
    }

}
