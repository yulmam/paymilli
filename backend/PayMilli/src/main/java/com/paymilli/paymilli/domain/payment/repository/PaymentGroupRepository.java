package com.paymilli.paymilli.domain.payment.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.paymilli.paymilli.domain.payment.entity.PaymentGroup;

public interface PaymentGroupRepository extends JpaRepository<PaymentGroup, UUID> {
}
