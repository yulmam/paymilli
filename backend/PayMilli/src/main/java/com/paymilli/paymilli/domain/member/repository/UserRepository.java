package com.paymilli.paymilli.domain.member.repository;

import com.paymilli.paymilli.domain.member.entity.UserEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    @EntityGraph(attributePaths = {"authorities"})
    Optional<UserEntity> findOneWithAuthoritiesByEmail(String email);
}