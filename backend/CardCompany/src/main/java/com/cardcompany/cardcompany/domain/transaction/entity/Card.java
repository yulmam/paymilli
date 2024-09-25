package com.cardcompany.cardcompany.domain.transaction.entity;

import com.cardcompany.cardcompany.domain.transaction.dto.client.CreateCreditCardTransactionRequest;
import com.cardcompany.cardcompany.domain.transaction.dto.client.UpdateDemandDepositAccountWithdrawalRequest;
import com.cardcompany.cardcompany.domain.transaction.dto.client.UpdateDemandDepositAccountWithdrawalResponse;
import com.cardcompany.cardcompany.domain.transaction.dto.response.CardInfoResponse;
import com.cardcompany.cardcompany.global.header.GlobalHeaderRequest;
import com.github.f4b6a3.ulid.UlidCreator;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Card {

    @Id
    @GeneratedValue
    @Column
    private UUID id;

    @Column(nullable = false)
    private String cardNumber;

    @Column(nullable = false)
    private String cvc;

    @Column(nullable = false)
    private String expirationDate;

    @Column(nullable = false)
    private String cardPassword;

    @Column(nullable = false)
    private String cardName;

    @Column(nullable = false)
    private String cardHolderName;

    @Column(nullable = true)
    private String cardImage;

    @Column(nullable = false)
    private CardType cardType;

    @Column
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column
    private Boolean deleted = false;

    @Column(nullable = false)
    private String userKey;

    @Column(nullable = true)
    private String account;

    @OneToMany(mappedBy = "card")
    private List<Payment> payments;

    @Builder
    public Card(String cardNumber, String cvc, String expirationDate, String cardPassword,
        String cardName, String cardHolderName, String cardImage, CardType cardType, String userKey,
        String account) {
        this.cardNumber = cardNumber;
        this.cvc = cvc;
        this.expirationDate = expirationDate;
        this.cardPassword = cardPassword;
        this.cardName = cardName;
        this.cardHolderName = cardHolderName;
        this.cardImage = cardImage;
        this.cardType = cardType;
        this.userKey = userKey;
        this.account = account;
    }

    public CardInfoResponse makeCardInfoResponse() {
        System.out.println(cardName);
        return CardInfoResponse.builder()
            .cardName(cardName)
            .cardImage(cardImage)
            .cardType(cardType)
            .build();
    }

    public CreateCreditCardTransactionRequest makeCreateCreditCardTransactionRequest(
        String paymentBalance, String apiKey) {
        return CreateCreditCardTransactionRequest.builder()
            .globalHeader(
                new GlobalHeaderRequest(
                    "createCreditCardTransaction",
                    apiKey,
                    userKey
                )
            )
            .cardNo(cardNumber)
            .cvc(cvc)
            .merchantId("1")
            .paymentBalance(paymentBalance)
            .build();
    }

    public UpdateDemandDepositAccountWithdrawalRequest makeUpdateDemandDepositAccountWithdrawalResponse(
        String paymentBalance, String apiKey) {
        System.out.println(account);
        System.out.println(paymentBalance);
        System.out.println("test");
        return UpdateDemandDepositAccountWithdrawalRequest.builder()
            .globalHeader(
                new GlobalHeaderRequest(
                    "updateDemandDepositAccountWithdrawal",
                    apiKey,
                    userKey
                )
            )
            .accountNo(account)
            .transactionBalance(paymentBalance)
            .transactionSummary("체크 카드 결제")
            .build();
    }

}
