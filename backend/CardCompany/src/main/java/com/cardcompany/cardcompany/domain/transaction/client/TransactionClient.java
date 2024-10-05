package com.cardcompany.cardcompany.domain.transaction.client;

import com.cardcompany.cardcompany.domain.transaction.dto.client.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.nio.charset.StandardCharsets;

@Component
public class TransactionClient {

    private final WebClient webClient;

    public TransactionClient(WebClient.Builder webClient) {
        this.webClient = webClient.build();
    }

    public MemberSearchResponse getApiKey(MemberSearchRequest request) {
        return webClient.post()
            .uri("/member/search")
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .bodyValue(request)
            .retrieve()
            .bodyToMono(MemberSearchResponse.class)
            .blockOptional()
            .orElseThrow();
    }

    public UpdateDemandDepositAccountWithdrawalResponse payCheck(
        UpdateDemandDepositAccountWithdrawalRequest request) {
        return webClient.post()
            .uri("/edu/demandDeposit/updateDemandDepositAccountTransfer")
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .bodyValue(request)
            .retrieve()
            .bodyToMono(UpdateDemandDepositAccountWithdrawalResponse.class)
            .blockOptional()
            .orElseThrow();
    }

    public CreateCreditCardTransactionResponse payCredit(
        CreateCreditCardTransactionRequest request) {
        return webClient.post()
            .uri("/edu/creditCard/createCreditCardTransaction")
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .bodyValue(request)
            .retrieve()
            .bodyToMono(CreateCreditCardTransactionResponse.class)
            .blockOptional()
            .orElseThrow();
    }

    public UpdateDemandDepositAccountTransferResponse payTransfer(
        UpdateDemandDepositAccountTransferRequest request
    ){

        System.out.println(request.getDepositAccountNo());
        System.out.println(request.getWithdrawalAccountNo());
        System.out.println("check");
        return webClient.post()
            .uri("/edu/demandDeposit/updateDemandDepositAccountTransfer")
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .bodyValue(request)
            .retrieve()
            .bodyToMono(UpdateDemandDepositAccountTransferResponse.class)
            .blockOptional()
            .orElseThrow();
    }


    public UpdateDemandDepositAccountDepositResponse refundCheck(
        UpdateDemandDepositAccountDepositRequest request) {
        return webClient.post()
            .uri("/edu/demandDeposit/updateDemandDepositAccountDeposit")
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .bodyValue(request)
            .retrieve()
            .bodyToMono(UpdateDemandDepositAccountDepositResponse.class)
            .blockOptional()
            .orElseThrow();
    }

    public DeleteTransactionResponse refundCredit(DeleteTransactionRequest request) {
        return webClient.post()
            .uri("/edu/creditCard/deleteTransaction")
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .bodyValue(request)
            .retrieve()
            .bodyToMono(DeleteTransactionResponse.class)
            .blockOptional()
            .orElseThrow();
    }
}
