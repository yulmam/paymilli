package com.paymilli.paymilli.domain.card.service;

import com.paymilli.paymilli.domain.card.dto.request.AddCardRequest;
import com.paymilli.paymilli.domain.card.dto.response.CardResponse;

import java.util.List;
import java.util.UUID;

public interface CardService {
    public boolean isAlreadyRegister(String cardNumber, UUID userId);

    public void checkValidation(AddCardRequest addCardRequest);

    public void registerCard(AddCardRequest addCardRequest, UUID userId);

    public List<CardResponse> searchCards(UUID userId);

    public void deleteCard(UUID cardId, UUID userId);
}
