package com.paymilli.paymilli.domain.card.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class CardServiceImpl implements CardService{
    private final WebClient webClient;

    private final CardRepository cardRepository;

    public CardServiceImpl(WebClient webClient, CardRepository cardRepository){
        this.webClient  = webClient;
        this.cardRepository = cardRepository
    }



}
