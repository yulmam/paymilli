package com.cardcompany.cardcompany.domain.transaction.entity;

import com.github.f4b6a3.ulid.UlidCreator;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Installment {

    @Id
    @Column(columnDefinition = "BINARY(16)")
    private UUID id = UlidCreator.getMonotonicUlid().toUuid();

    @Column(nullable = false)
    private LocalDate installmentDate;

    @Column(nullable = false)
    private Long price;

    @Column(nullable = false)
    private InstallmentStatus installmentStatus;

    @Column
    private String transactionUniqueName;

    @ManyToOne
    @JoinColumn(name = "payment_id")
    private Payment payment;

    @Builder
    public Installment(LocalDate installmentDate, Long price, InstallmentStatus installmentStatus,
        Payment payment) {
        this.installmentDate = installmentDate;
        this.price = price;
        this.installmentStatus = installmentStatus;
        setPayment(payment);
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
        if (!payment.getInstallments().contains(this)) {
            payment.getInstallments().add(this);
        }
    }
}
