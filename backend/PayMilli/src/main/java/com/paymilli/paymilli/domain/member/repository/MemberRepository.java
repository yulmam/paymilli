package com.paymilli.paymilli.domain.member.repository;

import com.paymilli.paymilli.domain.member.entity.Member;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MemberRepository extends JpaRepository<Member, UUID> {

    Optional<Member> findByMemberId(String memberId);
}