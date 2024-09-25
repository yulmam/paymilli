package com.paymilli.paymilli.domain.payment.repository;

import com.paymilli.paymilli.domain.payment.entity.PaymentGroup;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentGroupRepository extends JpaRepository<PaymentGroup, UUID> {

    Page<PaymentGroup> findByMemberId(String memberId, Pageable pageable);
}
