package com.cardcompany.cardcompany.domain.setting.service;

import com.cardcompany.cardcompany.domain.setting.dto.dto.request.CardInsertRequest;
import com.cardcompany.cardcompany.domain.transaction.entity.Card;
import com.cardcompany.cardcompany.domain.transaction.repository.CardRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class SettingServiceImpl implements SettingService {

    private final CardRepository cardRepository;

    public SettingServiceImpl(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    @Override
    public void insertCard(CardInsertRequest request) {
        Card card = Card.builder()
            .cardNumber(request.getCardNumber())
            .cvc(request.getCvc())
            .expirationDate(request.getExpirationDate())
            .cardPassword(request.getCardPassword())
            .cardName(request.getCardName())
            .cardHolderName(request.getCardHolderName())
            .cardImage(request.getCardImage())
            .cardType(request.getCardType())
            .userKey(request.getUserKey())
            .account(request.getAccount())
            .build();
        cardRepository.save(card);
    }
}
