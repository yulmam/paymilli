package com.paymilli.paymilli.domain.card.dto.response;

import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CardListResponse {
    UUID mainCardId;
    List<CardResponse> cardList;
}
