package com.cardcompany.cardcompany.domain.transaction.dto.client;

import com.cardcompany.cardcompany.global.header.GlobalHeaderRequest;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DeleteTransactionRequest {

    @JsonProperty("Header")
    private GlobalHeaderRequest globalHeader;
    private String cardNo;
    private String cvc;
    private String transactionUniqueNo;
}
