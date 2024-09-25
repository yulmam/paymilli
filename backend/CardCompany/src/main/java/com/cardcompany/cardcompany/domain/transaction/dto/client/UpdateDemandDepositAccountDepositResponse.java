package com.cardcompany.cardcompany.domain.transaction.dto.client;

import com.cardcompany.cardcompany.domain.transaction.dto.response.DepositResponse;
import com.cardcompany.cardcompany.global.header.GlobalHeaderResponse;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateDemandDepositAccountDepositResponse {
    @JsonProperty("Header")
    private GlobalHeaderResponse globalHeader;
    @JsonProperty("REC")
    private DepositResponse response;
}
