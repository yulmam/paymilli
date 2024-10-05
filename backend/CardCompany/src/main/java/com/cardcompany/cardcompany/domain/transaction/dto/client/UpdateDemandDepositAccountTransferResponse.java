package com.cardcompany.cardcompany.domain.transaction.dto.client;

import com.cardcompany.cardcompany.domain.transaction.dto.response.TransferResponse;
import com.cardcompany.cardcompany.global.header.GlobalHeaderRequest;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdateDemandDepositAccountTransferResponse {
    @JsonProperty("Header")
    private GlobalHeaderRequest globalHeader;
    @JsonProperty("REC")
    private List<TransferResponse> response;
}
