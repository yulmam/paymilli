package com.cardcompany.cardcompany.domain.transaction.dto.client;

import com.cardcompany.cardcompany.global.header.GlobalHeaderRequest;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateDemandDepositAccountDepositRequest {
    @JsonProperty("Header")
    private GlobalHeaderRequest globalHeader;
    private String accountNo;
    private String transactionBalance;
    private String transactionSummary;
}
