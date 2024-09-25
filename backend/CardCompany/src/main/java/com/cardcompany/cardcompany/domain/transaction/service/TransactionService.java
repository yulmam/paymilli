package com.cardcompany.cardcompany.domain.transaction.service;

import com.cardcompany.cardcompany.domain.transaction.dto.request.CardValidationRequest;
import com.cardcompany.cardcompany.domain.transaction.dto.request.PayRequest;
import com.cardcompany.cardcompany.domain.transaction.dto.response.CardInfoResponse;
import com.cardcompany.cardcompany.domain.transaction.dto.response.PayResponse;
import com.cardcompany.cardcompany.domain.transaction.dto.response.userKeyResponse;

public interface TransactionService {

    userKeyResponse getApiKey(String email);

    CardInfoResponse getCardInfo(CardValidationRequest request);

    PayResponse pay(PayRequest request);

    void refund(String approveNumber);
}
