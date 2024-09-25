package com.cardcompany.cardcompany.domain.transaction.repository;

import com.cardcompany.cardcompany.domain.transaction.dto.response.CardInfoResponse;
import com.cardcompany.cardcompany.domain.transaction.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CardRepository extends JpaRepository<Card, UUID> {
    Optional<Card> findByCardNumberAndCvcAndExpirationDateAndCardPasswordAndUserKey(String cardNumber, String cvc, String expirationDate, String cardPassword, String userKey);
    Optional<Card> findByCardNumberAndCvcAndExpirationDate(String cardNumber, String cvc, String expirationDate);
}
