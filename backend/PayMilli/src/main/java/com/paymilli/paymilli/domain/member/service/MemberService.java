package com.paymilli.paymilli.domain.member.service;

import com.paymilli.paymilli.domain.member.client.MemberClient;
import com.paymilli.paymilli.domain.member.dto.client.CardCompLoginRequest;
import com.paymilli.paymilli.domain.member.dto.client.CardCompLoginResponse;
import com.paymilli.paymilli.domain.member.dto.request.AddMemberRequest;
import com.paymilli.paymilli.domain.member.dto.request.TokenRequest;
import com.paymilli.paymilli.domain.member.dto.request.UpdatePaymentPasswordRequest;
import com.paymilli.paymilli.domain.member.dto.request.ValidatePaymentPasswordRequest;
import com.paymilli.paymilli.domain.member.dto.response.MemberInfoResponse;
import com.paymilli.paymilli.domain.member.dto.response.TokenResponse;
import com.paymilli.paymilli.domain.member.dto.response.ValidatePaymentPasswordResponse;
import com.paymilli.paymilli.domain.member.entity.Member;
import com.paymilli.paymilli.domain.member.exception.MemberNotExistException;
import com.paymilli.paymilli.domain.member.jwt.TokenProvider;
import com.paymilli.paymilli.domain.member.repository.MemberRepository;
import com.paymilli.paymilli.global.exception.BaseException;
import com.paymilli.paymilli.global.exception.BaseResponseStatus;
import com.paymilli.paymilli.global.util.RedisUtil;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final MemberClient memberClient;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final RedisUtil redisUtil;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder,
        TokenProvider tokenProvider,
        MemberClient memberClient, AuthenticationManagerBuilder authenticationManagerBuilder,
        RedisUtil redisUtil) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.memberClient = memberClient;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.redisUtil = redisUtil;
    }

    @Transactional
    public void addMember(AddMemberRequest addMemberRequest) {
        Optional<Member> memberOpt = memberRepository.findByMemberId(
            addMemberRequest.getMemberId());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate birthday = LocalDate.parse(addMemberRequest.getBirthday(), formatter);

        if (memberOpt.isPresent()) {
            Member member = memberOpt.get();

            if (member.isDeleted()) {
                member.create();
                member.update(addMemberRequest,
                    passwordEncoder.encode(addMemberRequest.getPassword()),
                    passwordEncoder.encode(addMemberRequest.getPaymentPassword()), birthday);

                return;
            }

            throw new BaseException(BaseResponseStatus.MEMBER_ALREADY_EXIST);
        }

        CardCompLoginResponse cardCompLoginResponse = memberClient.validateAndGetUserKey(
            new CardCompLoginRequest(addMemberRequest.getEmail()));

        Member member = Member.toEntity(addMemberRequest, cardCompLoginResponse.getUserKey(),
            birthday, passwordEncoder.encode(addMemberRequest.getPassword()),
            passwordEncoder.encode(addMemberRequest.getPaymentPassword()));

        memberRepository.save(member);
    }

    @Transactional
    public MemberInfoResponse getMemberInfo(UUID memberId) {
        return getMemberById(memberId).makeResponse();
    }

    @Transactional
    public void logoutMember(UUID memberId) {
        tokenProvider.removeRefreshToken(memberId);
    }

    @Transactional
    public boolean isSameRefreshToken(String refreshToken) {
        UUID memberId = tokenProvider.getId(refreshToken);

        String savedRefreshToken = tokenProvider.getRefreshToken(memberId.toString());

        System.out.println(savedRefreshToken);
        return savedRefreshToken != null;
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
    public String reissueAccessToken(String refreshToken) {
        Authentication authentication = tokenProvider.getAuthentication(refreshToken);
        return tokenProvider.createAccessToken(authentication, refreshToken);
    }

    @Transactional
    public void updatePaymentPassword(UUID memberId,
        String paymentPasswordToken,
        UpdatePaymentPasswordRequest updatePaymentPasswordRequest) {
        Member member = getMemberById(memberId);

        if (!redisUtil.hasKey(paymentPasswordToken)) {
            throw new IllegalArgumentException("적절하지 않는 수정 과정입니다. 결제 비밀번호 인증을 먼저 해주세요.");
        }

        member.setPaymentPassword(
            passwordEncoder.encode(updatePaymentPasswordRequest.getPaymentPassword()));

        redisUtil.removeDataFromRedis(paymentPasswordToken);
    }

    @Transactional
    public void deleteMember(UUID memberId) {
        Member member = getMemberById(memberId);
        member.delete();

        tokenProvider.removeRefreshToken(memberId);
    }

    @Transactional
    public Member getMemberById(UUID memberId) {
        Member member = memberRepository.findByIdAndDeleted(memberId, false)
            .orElseThrow(() -> new MemberNotExistException("Member Not found"));

        if (member.isDeleted()) {
            throw new IllegalArgumentException();
        }

        return member;
    }

    @Transactional
    public ValidatePaymentPasswordResponse validatePaymentPassword(UUID memberId,
        ValidatePaymentPasswordRequest validatePaymentPasswordRequest) {

        Optional<Member> memberOpt = memberRepository.findById(memberId);

        log.info(validatePaymentPasswordRequest.getPaymentPassword());
        if (memberOpt.isEmpty() || !isEqualPassword(memberOpt.get().getPaymentPassword(),
            validatePaymentPasswordRequest.getPaymentPassword())) {
            throw new IllegalArgumentException();
        }

        //redis 키 생성
        Random random = new Random();
        int randomNumber = 100000 + random.nextInt(900000); // 6자리 난수 생성 (100000 ~ 999999)

        String paymentPasswordToken = memberId + "-sequence-" + randomNumber;

        redisUtil.saveDataToRedis(paymentPasswordToken, 1, 300 * 1000);

        return new ValidatePaymentPasswordResponse(paymentPasswordToken);
    }

    public boolean isEqualPassword(String password, String input) {
        return passwordEncoder.matches(input, password);
    }
}
