package com.cardcompany.cardcompany.domain.transaction.repository;

import com.cardcompany.cardcompany.domain.transaction.entity.Installment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface InstallmentRepository extends JpaRepository<Installment, UUID> {
}
