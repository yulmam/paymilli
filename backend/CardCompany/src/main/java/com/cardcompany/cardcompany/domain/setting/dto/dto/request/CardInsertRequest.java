package com.cardcompany.cardcompany.domain.setting.dto.dto.request;


import com.cardcompany.cardcompany.domain.transaction.entity.CardType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CardInsertRequest {

    private String cardNumber;
    private String cvc;
    private String cardPassword;
    private String expirationDate;
    private String cardName;
    private String cardHolderName;
    private CardType cardType;
    private String cardImage;
    private String userKey;
    private String account;
}
