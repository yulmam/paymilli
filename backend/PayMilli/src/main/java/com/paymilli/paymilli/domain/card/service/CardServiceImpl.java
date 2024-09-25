package com.paymilli.paymilli.domain.card.service;

import com.paymilli.paymilli.domain.card.client.CardClient;
import com.paymilli.paymilli.domain.card.dto.request.AddCardRequest;
import com.paymilli.paymilli.domain.card.dto.response.CardResponse;
import com.paymilli.paymilli.domain.card.entity.Card;
import com.paymilli.paymilli.domain.card.repository.CardRepository;
import com.paymilli.paymilli.domain.member.repository.MemberRepository;
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
    private final MemberRepository memberRepository;

    public CardServiceImpl(CardClient cardClient,
        CardRepository cardRepository,
        MemberRepository memberRepository) {
        this.cardClient = cardClient;
        this.cardRepository = cardRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional
    public boolean isAlreadyRegister(String cardNumber, UUID memberId) {
        return cardRepository.findByCardNumberAndMemberId(cardNumber, memberId).isPresent();
    }

    @Transactional
    public void registerCard(AddCardRequest addCardRequest, UUID memberId) {
        if (isAlreadyRegister(addCardRequest.getCardNumber(), memberId)) {
            throw new IllegalArgumentException();
        }

        cardRepository.save(
            Card.toEntity(
                addCardRequest,
                cardClient.validateAndGetCardInfo(addCardRequest, memberId),
                memberRepository.getReferenceById(memberId)
            )
        );
    }

    @Transactional
    public List<CardResponse> searchCards(UUID memberId) {
        return cardRepository.findByMemberId(memberId).stream()
            .map(Card::makeResponse)
            .collect(Collectors.toList());
    }

    @Transactional
    public void deleteCard(UUID cardId, UUID memberId) {
        cardRepository.deleteByIdAndMemberId(cardId, memberId);
    }
}
