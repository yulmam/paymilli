package com.paymilli.paymilli.domain.payment.controller;

import com.paymilli.paymilli.domain.payment.dto.request.ApprovePaymentRequest;
import com.paymilli.paymilli.domain.payment.dto.request.DemandPaymentRequest;
import com.paymilli.paymilli.domain.payment.dto.request.RefundPaymentRequest;
import com.paymilli.paymilli.domain.payment.service.PaymentService;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/payment")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/demand")
    public ResponseEntity<?> demandPayment(
        @RequestHeader("Authorization") String token,
        @RequestBody DemandPaymentRequest demandPaymentRequest) {
        return new ResponseEntity<>(paymentService.issueTransactionId(token, demandPaymentRequest),
            HttpStatus.OK);
    }

    @PostMapping("/approve")
    public ResponseEntity<?> approvePayment(
        @RequestHeader("Authorization") String token,
        @RequestHeader("transactionId") String transactionId,
        @RequestHeader("sequence") String sequenceId,
        @RequestBody ApprovePaymentRequest approvePaymentRequest) {

        if (paymentService.approvePayment(token, transactionId, sequenceId,
            approvePaymentRequest)) {
            return new ResponseEntity<>("결제가 정상처리 되었습니다.", HttpStatus.OK);
        }

        return new ResponseEntity<>("결제 오류가 발생하였습니다.", HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public ResponseEntity<?> getPaymentsGroup(
        @RequestHeader("Authorization") String token,
        @RequestParam(value = "sort", required = false, defaultValue = "0") int sort,
        @RequestParam(value = "page", required = false, defaultValue = "1") int page,
        @RequestParam(value = "size", required = false, defaultValue = "15") int size,
        @RequestParam(value = "startDate", required = false, defaultValue = "1900-01-01") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
        @RequestParam(value = "endDate", required = false, defaultValue = "#{T(java.time.LocalDate).now()}") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate
    ) {
        return new ResponseEntity<>(
            paymentService.searchPaymentGroup(token, sort, page - 1, size, startDate, endDate),
            HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPayment(
        @RequestHeader("Authorization") String token,
        @PathVariable("id") String id) {
        return new ResponseEntity<>(paymentService.getPaymentGroup(id),
            HttpStatus.OK);
    }

    @PostMapping("/refund")
    public ResponseEntity<?> refundPayment(
        @RequestHeader("Authorization") String token,
        @RequestBody RefundPaymentRequest refundPaymentRequest) {
        if (paymentService.refundPayment(refundPaymentRequest)) {
            return new ResponseEntity<>("환불 요청이 처리되었습니다.",
                HttpStatus.OK);
        }

        return new ResponseEntity<>("환불 오류가 발생하였습니다.",
            HttpStatus.NOT_FOUND);
    }
}
