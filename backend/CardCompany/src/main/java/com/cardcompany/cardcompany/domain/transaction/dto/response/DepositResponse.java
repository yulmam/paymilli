package com.cardcompany.cardcompany.domain.transaction.dto.response;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DepositResponse {
    private String transactionUniqueNo;
    private String transactionDate;
}
