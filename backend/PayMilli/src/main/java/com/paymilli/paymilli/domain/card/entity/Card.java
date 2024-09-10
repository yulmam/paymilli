package com.paymilli.paymilli.domain.card.entity;


import com.paymilli.paymilli.domain.card.dto.request.AddCardRequest;
import com.paymilli.paymilli.domain.card.dto.response.CardInfoResponse;
import com.paymilli.paymilli.domain.card.dto.response.CardResponse;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Card {

    @Id
    private UUID id;

//  user 개발시 주석 제거
//    @ManyToOne
//    private User user;
//
//  payment 개발시 주석 제거
//    @OneToMany(mappedBy = "card")
//    private List<Payment> payments;

    @Column(nullable = false)
    private String cardNumber;

    @Column(nullable = false)
    private String CVC;

    @Column(nullable = false)
    private String expiration_date;

    @Column(nullable = false)
    private String cardName;

    @Column(nullable = false)
    private String cardHolderName;

    @Column
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

    public static Card toEntity(AddCardRequest addCardRequest, CardInfoResponse cardInfoResponse){//User user 추가 필요
        return Card.builder()
                .cardNumber(addCardRequest.getCardNumber())
                .CVC(addCardRequest.getCvc())
                .expiration_date(addCardRequest.getExpirationDate())
                .cardHolderName(addCardRequest.getCardHolderName())
                .cardImage(cardInfoResponse.getCardImage())
                .cardName(cardInfoResponse.getCardName())
                .cardType(cardInfoResponse.getCardType())
                //.user(user)
                .build();
    }

    public CardResponse makeResponse(){
        return CardResponse.builder()
                .cardId(id)
                .cardName(cardName)
                .cardType(cardType)
                .cardLastNum(cardNumber.substring(12, 15))
                .cardImage(cardImage)
                .build();
    }
}
