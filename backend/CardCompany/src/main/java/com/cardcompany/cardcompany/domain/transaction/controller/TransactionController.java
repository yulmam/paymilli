package com.cardcompany.cardcompany.domain.transaction.controller;


import com.cardcompany.cardcompany.domain.transaction.dto.request.CardValidationRequest;
import com.cardcompany.cardcompany.domain.transaction.dto.request.LoginCheckRequest;
import com.cardcompany.cardcompany.domain.transaction.dto.request.PayRequest;
import com.cardcompany.cardcompany.domain.transaction.dto.request.RefundRequest;
import com.cardcompany.cardcompany.domain.transaction.dto.response.CardInfoResponse;
import com.cardcompany.cardcompany.domain.transaction.dto.response.userKeyResponse;
import com.cardcompany.cardcompany.domain.transaction.service.TransactionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class TransactionController {

    TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/join")
    public ResponseEntity<userKeyResponse> loginCheck(@RequestBody LoginCheckRequest request) {
        return new ResponseEntity<>(transactionService.getApiKey(request.getEmail()),
            HttpStatus.OK);
    }

    @PostMapping("/validation")
    public ResponseEntity<CardInfoResponse> getInfo(@RequestBody CardValidationRequest request) {
        return new ResponseEntity<>(transactionService.getCardInfo(request), HttpStatus.OK);
    }

    @PostMapping("/payment")
    public ResponseEntity<?> pay(@RequestBody PayRequest request) {
        return new ResponseEntity<>(transactionService.pay(request), HttpStatus.OK);
    }

    @PostMapping("/refund")
    public ResponseEntity<?> refund(@RequestBody RefundRequest request) {
        transactionService.refund(request.getApproveNumber());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
