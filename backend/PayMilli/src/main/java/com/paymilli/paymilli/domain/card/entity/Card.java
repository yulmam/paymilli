package com.paymilli.paymilli.domain.card.entity;


import com.paymilli.paymilli.domain.card.dto.request.AddCardRequest;
import com.paymilli.paymilli.domain.card.dto.response.CardInfoResponse;
import com.paymilli.paymilli.domain.card.dto.response.CardResponse;
import com.paymilli.paymilli.domain.member.entity.Member;
import com.paymilli.paymilli.domain.payment.entity.Payment;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Card {

    @Id
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "card")
    private List<Payment> payments;

    @Column(nullable = false)
    private String cardNumber;

    @Column(nullable = false)
    private String CVC;

    @Column(nullable = false)
    private String expirationDate;

    @Column(nullable = false)
    private String cardName;

    @Column(nullable = false)
    private String cardHolderName;

    @Column(nullable = false)
    private String cardImage;

    @Column(nullable = false)
    private CardType cardType;

    @Column
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Column
    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

    @ColumnDefault("false")
    private boolean deleted;

    public static Card toEntity(AddCardRequest addCardRequest,
        CardInfoResponse cardInfoResponse) {//User user 추가 필요
        return Card.builder()
            .cardNumber(addCardRequest.getCardNumber())
            .CVC(addCardRequest.getCvc())
            .expirationDate(addCardRequest.getExpirationDate())
            .cardHolderName(addCardRequest.getCardHolderName())
            .cardImage(cardInfoResponse.getCardImage())
            .cardName(cardInfoResponse.getCardName())
            .cardType(cardInfoResponse.getCardType())
            //.user(user)
            .build();
    }

    public CardResponse makeResponse() {
        return CardResponse.builder()
            .cardId(id)
            .cardName(cardName)
            .cardType(cardType)
            .cardLastNum(cardNumber.substring(12, 15))
            .cardImage(cardImage)
            .build();
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public void addPayment(Payment payment) {
        payments.add(payment);
        payment.setCard(this);
    }
}
