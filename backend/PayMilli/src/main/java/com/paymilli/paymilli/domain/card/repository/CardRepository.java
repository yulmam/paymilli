package com.paymilli.paymilli.domain.card.repository;

import com.paymilli.paymilli.domain.card.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CardRepository extends JpaRepository<Card, UUID> {
    Optional<Card> findByCardNumberAndUserId(String cardNumber, UUID userId);

    List<Card> findByUserId(UUID userId);

    void deleteByIdAndUserId(UUID cardId, UUID userId);
}
