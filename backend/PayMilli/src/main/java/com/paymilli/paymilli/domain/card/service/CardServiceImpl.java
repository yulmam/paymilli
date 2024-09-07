package com.paymilli.paymilli.domain.card.service;

import com.paymilli.paymilli.domain.card.dto.request.AddCardRequest;
import com.paymilli.paymilli.domain.card.dto.response.CardResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.UUID;

@Service
public class CardServiceImpl implements CardService{
    private final WebClient webClient;

    private final CardRepository cardRepository;

    public CardServiceImpl(WebClient webClient, CardRepository cardRepository){
        this.webClient  = webClient;
        this.cardRepository = cardRepository;
    }


    @Override
    public boolean isAlreadyRegister(String cardNumber, UUID userId) {
        return false;
    }

    @Override
    public void checkValidation(AddCardRequest addCardRequest) {

    }

    @Override
    public void registerCard(AddCardRequest addCardRequest, UUID userId) {

    }

    @Override
    public List<CardResponse> searchCards(UUID userId) {
        return List.of();
    }

    @Override
    public void deleteCard(UUID cardId, UUID userId) {

    }
}
