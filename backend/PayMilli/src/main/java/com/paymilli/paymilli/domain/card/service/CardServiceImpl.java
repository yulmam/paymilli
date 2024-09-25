package com.paymilli.paymilli.domain.card.service;

import com.paymilli.paymilli.domain.card.client.CardClient;
import com.paymilli.paymilli.domain.card.dto.client.CardValidationRequest;
import com.paymilli.paymilli.domain.card.dto.client.CardValidationResponse;
import com.paymilli.paymilli.domain.card.dto.request.AddCardRequest;
import com.paymilli.paymilli.domain.card.dto.response.CardResponse;
import com.paymilli.paymilli.domain.card.entity.Card;
import com.paymilli.paymilli.domain.card.repository.CardRepository;
import com.paymilli.paymilli.domain.member.entity.Member;
import com.paymilli.paymilli.domain.member.repository.MemberRepository;
import java.util.List;
import java.util.Optional;
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
    public void registerCard(AddCardRequest addCardRequest, UUID memberId) {
        Optional<Card> cardOpt = cardRepository.findByCardNumberAndMemberId(
            addCardRequest.getCardNumber(), memberId);
        if(cardOpt.isPresent()){
            Card card = cardOpt.get();
            if(!card.isDeleted())
                throw new IllegalArgumentException();
            card.create();
            return;
        }

        Member member = memberRepository.findById(memberId).orElseThrow();

        CardValidationRequest cardValidationRequest = CardValidationRequest.builder()
            .cardNumber(addCardRequest.getCardNumber())
            .cvc(addCardRequest.getCvc())
            .expirationDate(addCardRequest.getExpirationDate())
            .cardPassword(addCardRequest.getCardPassword())
            .userKey(member.getUserKey())
            .build();

        CardValidationResponse response = cardClient.validateAndGetCardInfo(
           cardValidationRequest
        );

        cardRepository.save(
            Card.toEntity(
                addCardRequest,
                response,
                member
            )
        );
    }

    @Transactional
    public List<CardResponse> searchCards(UUID memberId) {
        return cardRepository.findByMemberId(memberId).stream()
            .filter(card -> !card.isDeleted())
            .map(Card::makeResponse)
            .collect(Collectors.toList());
    }

    @Transactional
    public void deleteCard(UUID cardId, UUID memberId) {
        Card card = cardRepository.findByIdAndMemberId(cardId, memberId).orElseThrow(IllegalArgumentException::new);
        card.delete();
    }
}
