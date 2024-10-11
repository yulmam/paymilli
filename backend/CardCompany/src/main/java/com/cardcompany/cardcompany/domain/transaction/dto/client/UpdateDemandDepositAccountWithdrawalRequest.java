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
public class UpdateDemandDepositAccountWithdrawalRequest {
    @JsonProperty("Header")
    private GlobalHeaderRequest globalHeader;
    private String accountNo;
    private String transactionBalance;
    private String transactionSummary;
}
