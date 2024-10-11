package com.cardcompany.cardcompany.domain.transaction.dto.response;

import com.cardcompany.cardcompany.domain.transaction.entity.CardType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CardInfoResponse {

    private String cardName;
    private String cardImage;
    private CardType cardType;
}
