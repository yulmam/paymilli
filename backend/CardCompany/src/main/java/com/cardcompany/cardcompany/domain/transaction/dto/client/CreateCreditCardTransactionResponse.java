package com.cardcompany.cardcompany.domain.transaction.dto.client;

import com.cardcompany.cardcompany.domain.transaction.dto.response.TransactionResponse;
import com.cardcompany.cardcompany.global.header.GlobalHeaderResponse;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreateCreditCardTransactionResponse {
    @JsonProperty("Header")
    private GlobalHeaderResponse headerResponse;
    @JsonProperty("REC")
    private TransactionResponse transactionResponse;
}
