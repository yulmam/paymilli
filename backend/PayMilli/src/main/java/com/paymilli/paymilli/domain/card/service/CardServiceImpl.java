package com.paymilli.paymilli.domain.card.service;

import com.paymilli.paymilli.domain.card.client.CardClient;
import com.paymilli.paymilli.domain.card.dto.request.AddCardRequest;
import com.paymilli.paymilli.domain.card.dto.response.CardResponse;
import com.paymilli.paymilli.domain.card.entity.Card;
import com.paymilli.paymilli.domain.card.repository.CardRepository;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CardServiceImpl implements CardService {

    private final CardClient cardClient;

    private final CardRepository cardRepository;
    //user 완성 시 추가
    //private final UserRepository userRepository;

    public CardServiceImpl(CardClient cardClient,
        CardRepository cardRepository) { // UserRepository userRepository
        this.cardClient = cardClient;
        this.cardRepository = cardRepository;
        //this.userRepository = userRepository;
    }

    @Transactional
    public boolean isAlreadyRegister(String cardNumber, UUID userId) {
        return cardRepository.findByCardNumberAndMemberId(cardNumber, userId).isPresent();
    }

    @Transactional
    public void registerCard(AddCardRequest addCardRequest, UUID userId) {
        if (isAlreadyRegister(addCardRequest.getCardNumber(), userId)) {
            throw new IllegalArgumentException();
        }

        cardRepository.save(
            Card.toEntity(
                addCardRequest,
                cardClient.validateAndGetCardInfo(addCardRequest, userId)//,
                //userRepository.getReferenceByUserId(userId)
            )
        );
    }

    @Transactional
    public List<CardResponse> searchCards(UUID userId) {
        return cardRepository.findByMemberId(userId).stream()
            .map(Card::makeResponse)
            .collect(Collectors.toList());
    }

    @Transactional
    public void deleteCard(UUID cardId, UUID userId) {
        cardRepository.deleteByIdAndMemberId(cardId, userId);
    }
}
