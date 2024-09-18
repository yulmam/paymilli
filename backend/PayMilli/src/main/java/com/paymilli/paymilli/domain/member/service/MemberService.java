package com.paymilli.paymilli.domain.member.service;

import com.paymilli.paymilli.domain.member.client.MemberClient;
import com.paymilli.paymilli.domain.member.dto.client.CardCompLoginRequest;
import com.paymilli.paymilli.domain.member.dto.client.CardCompLoginResponse;
import com.paymilli.paymilli.domain.member.dto.request.AddMemberRequest;
import com.paymilli.paymilli.domain.member.entity.Member;
import com.paymilli.paymilli.domain.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MemberClient memberClient;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder,
        MemberClient memberClient) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.memberClient = memberClient;
    }

    @Transactional
    public boolean isAlreadyRegister(String memberId) {
        return memberRepository.findByMemberId(memberId).isPresent();
    }


    @Transactional
    public void addMember(AddMemberRequest addMemberRequest) {
        if (isAlreadyRegister(addMemberRequest.getMemberId())) {
            throw new RuntimeException("이미 가입되어 있는 사용자 입니다.");
        }

        CardCompLoginResponse cardCompLoginResponse = memberClient.validateAndGetUserKey(
            new CardCompLoginRequest(addMemberRequest.getEmail()));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDateTime birthday = LocalDateTime.parse(addMemberRequest.getBirthday(), formatter);

        Member member = Member.toEntity(addMemberRequest, cardCompLoginResponse.getUserKey(),
            birthday, passwordEncoder.encode(addMemberRequest.getPassword()),
            passwordEncoder.encode(addMemberRequest.getPaymentPassword()));

        memberRepository.save(member);
    }

}
