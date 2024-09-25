package com.cardcompany.cardcompany.domain.transaction.entity;

import com.cardcompany.cardcompany.domain.transaction.dto.client.UpdateDemandDepositAccountDepositRequest;
import com.cardcompany.cardcompany.domain.transaction.dto.client.UpdateDemandDepositAccountWithdrawalRequest;
import com.cardcompany.cardcompany.global.header.GlobalHeaderRequest;
import com.github.f4b6a3.ulid.UlidCreator;
import jakarta.persistence.*;
import java.util.ArrayList;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @Column(columnDefinition = "BINARY(16)")
    private UUID id = UlidCreator.getMonotonicUlid().toUuid();

    @Column(nullable = false)
    private Long price;

    @Column
    private PaymentStatus paymentStatus;

    @Column(nullable = false)
    private String storeName;

    @Column
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column
    private Boolean deleted = false;

    @Column(nullable = false)
    private String approveNumber;

    @ManyToOne
    @JoinColumn(name = "card_id")
    private Card card;

    @OneToMany(mappedBy = "payment")
    private List<Installment> installments = new ArrayList<>();

    @Builder
    public Payment(Long price, PaymentStatus paymentStatus, String storeName, String approveNumber,
        Card card) {
        this.price = price;
        this.paymentStatus = paymentStatus;
        this.storeName = storeName;
        this.approveNumber = approveNumber;
        this.card = card;
    }

    public void addInstallment(Installment installment) {
        this.installments.add(installment);
        if (installment.getPayment() != this) {
            installment.setPayment(this);
        }
    }

    public UpdateDemandDepositAccountDepositRequest makeUpdateDemandDepositAccountDepositRequest(
        String apiKey) {
        return UpdateDemandDepositAccountDepositRequest.builder()
            .globalHeader(
                new GlobalHeaderRequest(
                    "updateDemandDepositAccountDeposit",
                    apiKey,
                    card.getUserKey()
                )
            )
            .accountNo(card.getAccount())
            .transactionBalance(String.valueOf(price))
            .transactionSummary("체크 카드 환불")
            .build();
    }
}
