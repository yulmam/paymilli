package com.cardcompany.cardcompany.domain.transaction.repository;


import com.cardcompany.cardcompany.domain.transaction.entity.Payment;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, UUID> {

    Optional<Payment> findByApproveNumber(String approveNumber);
}
