package com.paymilli.paymilli.domain.card.service;

import com.paymilli.paymilli.domain.card.client.CardClient;
import com.paymilli.paymilli.domain.card.dto.client.CardValidationRequest;
import com.paymilli.paymilli.domain.card.dto.client.CardValidationResponse;
import com.paymilli.paymilli.domain.card.dto.request.AddCardRequest;
import com.paymilli.paymilli.domain.card.dto.response.CardListResponse;
import com.paymilli.paymilli.domain.card.dto.response.CardResponse;
import com.paymilli.paymilli.domain.card.entity.Card;
import com.paymilli.paymilli.domain.card.repository.CardRepository;
import com.paymilli.paymilli.domain.member.entity.Member;
import com.paymilli.paymilli.domain.member.repository.MemberRepository;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
public class CardServiceImpl implements CardService {
    private final CardClient cardClient;
    private final CardRepository cardRepository;
    private final MemberRepository memberRepository;

    public CardServiceImpl(CardClient cardClient,
        CardRepository cardRepository,
        MemberRepository memberRepository) {
        this.cardClient = cardClient;
        this.cardRepository = cardRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional
    public void registerCard(AddCardRequest addCardRequest, UUID memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(IllegalArgumentException::new);

        CardValidationResponse response = cardClient.validateAndGetCardInfo(
            CardValidationRequest.builder()
                .cardNumber(addCardRequest.getCardNumber())
                .cvc(addCardRequest.getCvc())
                .expirationDate(addCardRequest.getExpirationDate())
                .cardPassword(addCardRequest.getCardPassword())
                .userKey(member.getUserKey())
                .build()
        );

        Optional<Card> cardOpt = cardRepository.findByCardNumberAndMemberId(
            addCardRequest.getCardNumber(), memberId);

        if (cardOpt.isPresent()) {
            Card card = cardOpt.get();
            if (!card.isDeleted()) {
                throw new IllegalArgumentException();
            }
            card.create();
            return;
        }

        Card card = Card.toEntity(addCardRequest, response, member);

        cardRepository.save(card);

        if(member.getMainCard() == null){
            member.setMainCard(card);
        }
    }

    @Transactional
    public CardListResponse searchCards(UUID memberId) {
        List<Card> cards = cardRepository.findByMemberId(memberId);
        Card mainCard = memberRepository.findById(memberId).orElseThrow().getMainCard();

        //mainCard를 list에서 찾기
        int mainCardIdx = cards.indexOf(mainCard);

        if(mainCardIdx == -1){
            throw new IllegalArgumentException();
        }

        List<CardResponse> cardResponses = cards.stream()
            .filter(card -> !card.isDeleted())
            .map(Card::makeResponse)
            .collect(Collectors.toList());

        //메인 카드를 제일 앞으로
        if(mainCardIdx != 0)
            Collections.swap(cardResponses, 0, mainCardIdx);

        return new CardListResponse(mainCard.getId(), cardResponses);
    }

    @Transactional
    public void deleteCard(UUID cardId, UUID memberId) {
        Member member =  memberRepository.findById(memberId).orElseThrow();

        if(member.getMainCard().getId()==cardId){
            throw new IllegalArgumentException();
        }

        Card card = cardRepository.findByIdAndMemberId(cardId, memberId)
            .orElseThrow(IllegalArgumentException::new);

        if(card.isDeleted()) {
            throw new IllegalArgumentException();
        }

        card.delete();
    }

    @Transactional
    public void changeMainCard(UUID cardId, UUID memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(IllegalArgumentException::new);

        Card card = cardRepository.findByIdAndMemberId(cardId, memberId).orElseThrow(IllegalArgumentException::new);

        if(member.getMainCard().getId()==card.getId()){
            throw new IllegalArgumentException();
        }

        member.setMainCard(card);
    }
}
