package com.cardcompany.cardcompany.domain.transaction.dto.client;

import com.cardcompany.cardcompany.global.header.GlobalHeaderRequest;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreateCreditCardTransactionRequest {
    @JsonProperty("Header")
    private GlobalHeaderRequest globalHeader;
    private String cardNo;
    private String cvc;
    private String merchantId;
    private String paymentBalance;

}
