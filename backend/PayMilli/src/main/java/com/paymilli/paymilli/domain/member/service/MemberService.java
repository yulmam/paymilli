package com.paymilli.paymilli.domain.member.service;

import com.paymilli.paymilli.domain.member.client.MemberClient;
import com.paymilli.paymilli.domain.member.dto.request.AddMemberRequest;
import com.paymilli.paymilli.domain.member.dto.request.TokenRequest;
import com.paymilli.paymilli.domain.member.dto.request.UpdatePaymentPasswordRequest;
import com.paymilli.paymilli.domain.member.dto.response.MemberInfoResponse;
import com.paymilli.paymilli.domain.member.dto.response.TokenResponse;
import com.paymilli.paymilli.domain.member.entity.Member;
import com.paymilli.paymilli.domain.member.jwt.TokenProvider;
import com.paymilli.paymilli.domain.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final MemberClient memberClient;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder,
        TokenProvider tokenProvider,
        MemberClient memberClient, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.memberClient = memberClient;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
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

//        CardCompLoginResponse cardCompLoginResponse = memberClient.validateAndGetUserKey(
//            new CardCompLoginRequest(addMemberRequest.getEmail()));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate birthday = LocalDate.parse(addMemberRequest.getBirthday(), formatter);

//        Member member = Member.toEntity(addMemberRequest, cardCompLoginResponse.getUserKey(),
//            birthday, passwordEncoder.encode(addMemberRequest.getPassword()),
//            passwordEncoder.encode(addMemberRequest.getPaymentPassword()));

        Member member = Member.toEntity(addMemberRequest, "",
            birthday, passwordEncoder.encode(addMemberRequest.getPassword()),
            passwordEncoder.encode(addMemberRequest.getPaymentPassword()));

        memberRepository.save(member);
    }

    @Transactional
    public void addRefreshToken(String memberId, String refreshToken) {
        Member member = memberRepository.findByMemberId(memberId).orElseThrow();

        member.setRefreshToken(refreshToken);
    }

    @Transactional
    public MemberInfoResponse getMemberInfo(String memberId) {
        Member member = memberRepository.findByMemberId(memberId).orElseThrow();

        return member.makeResponse();
    }

    @Transactional
    public void logoutMember(String memberId) {
        Member member = memberRepository.findByMemberId(memberId).orElseThrow();
        member.setRefreshToken("");
    }

    public boolean isSameRefreshToken(String memberId, String refreshToken) {
        Member member = memberRepository.findByMemberId(memberId).orElseThrow();

        return member.getRefreshToken().equals(refreshToken);
    }

    @Transactional
    public TokenResponse issueTokens(TokenRequest tokenRequest) {
        UsernamePasswordAuthenticationToken token =
            new UsernamePasswordAuthenticationToken(tokenRequest.getMemberId(),
                tokenRequest.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject()
            .authenticate(token);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String refreshToken = tokenProvider.createRefreshToken(authentication);
        String accessToken = tokenProvider.createAccessToken(authentication);

        return new TokenResponse(accessToken, refreshToken);
    }

    @Transactional
    public TokenResponse issueTokens(String memberId) {
        Member member = memberRepository.findByMemberId(memberId).orElseThrow();

        UsernamePasswordAuthenticationToken token =
            new UsernamePasswordAuthenticationToken(member.getMemberId(),
                member.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject()
            .authenticate(token);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return new TokenResponse(
            tokenProvider.createAccessToken(authentication),
            tokenProvider.createRefreshToken(authentication));
    }

    @Transactional
    public String reissueAccessToken(String refreshToken) {
        Authentication authentication = tokenProvider.getAuthentication(refreshToken);
        return tokenProvider.createAccessToken(authentication);
    }

    @Transactional
    public void updatePaymentPassword(String memberId,
        UpdatePaymentPasswordRequest updatePaymentPasswordRequest) {
        Member member = memberRepository.findByMemberId(memberId).orElseThrow();

        member.setPaymentPassword(
            passwordEncoder.encode(updatePaymentPasswordRequest.getPaymentPassword()));
    }
}
