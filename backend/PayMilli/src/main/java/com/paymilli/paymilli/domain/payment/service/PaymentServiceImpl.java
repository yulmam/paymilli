package com.paymilli.paymilli.domain.payment.service;

import com.paymilli.paymilli.domain.card.entity.Card;
import com.paymilli.paymilli.domain.card.repository.CardRepository;
import com.paymilli.paymilli.domain.member.entity.Member;
import com.paymilli.paymilli.domain.member.jwt.TokenProvider;
import com.paymilli.paymilli.domain.member.repository.MemberRepository;
import com.paymilli.paymilli.domain.payment.dto.request.ApprovePaymentRequest;
import com.paymilli.paymilli.domain.payment.dto.request.DemandPaymentCardRequest;
import com.paymilli.paymilli.domain.payment.dto.request.DemandPaymentRequest;
import com.paymilli.paymilli.domain.payment.dto.request.RefundPaymentRequest;
import com.paymilli.paymilli.domain.payment.dto.response.MetaResponse;
import com.paymilli.paymilli.domain.payment.dto.response.PaymentGroupResponse;
import com.paymilli.paymilli.domain.payment.dto.response.SearchPaymentGroupResponse;
import com.paymilli.paymilli.domain.payment.dto.response.TransactionResponse;
import com.paymilli.paymilli.domain.payment.entity.Payment;
import com.paymilli.paymilli.domain.payment.entity.PaymentGroup;
import com.paymilli.paymilli.domain.payment.repository.PaymentGroupRepository;
import com.paymilli.paymilli.global.util.RedisUtil;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class PaymentServiceImpl implements PaymentService {


    private final TokenProvider tokenProvider;
    private final RedisUtil redisUtil;
    private final PaymentDetailService paymentDetailService;
    private final CardRepository cardRepository;
    private final PaymentGroupRepository paymentGroupRepository;
    private final MemberRepository memberRepository;

    public PaymentServiceImpl(TokenProvider tokenProvider, RedisUtil redisUtil,
        PaymentDetailService paymentDetailService, CardRepository cardRepository,
        PaymentGroupRepository paymentGroupRepository, MemberRepository memberRepository) {
        this.tokenProvider = tokenProvider;
        this.redisUtil = redisUtil;
        this.paymentDetailService = paymentDetailService;
        this.cardRepository = cardRepository;
        this.paymentGroupRepository = paymentGroupRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional
    @Override
    public String issueTransactionId(String token, DemandPaymentRequest demandPaymentRequest) {
        String accessToken = tokenProvider.extractAccessToken(token);
        UUID memberId = tokenProvider.getId(accessToken);

        //redis key
        Random random = new Random();
        int randomNumber = 100000 + random.nextInt(900000); // 6자리 난수 생성 (100000 ~ 999999)

        String transactionId = memberId + "-" + randomNumber;

        redisUtil.saveDataToRedis(transactionId, demandPaymentRequest, 86400 * 1000);

        return transactionId;
    }

    @Transactional
    @Override
    public boolean approvePayment(String token, String transactionId,
        ApprovePaymentRequest approvePaymentRequest) {
        String accessToken = tokenProvider.extractAccessToken(token);
        Member member = memberRepository.findById(tokenProvider.getId(accessToken))
            .orElseThrow();

        if (isNotSamePaymentPassword(member, approvePaymentRequest.getPassword())) {
            return false;
        }

        //redis로 데이터 가져옴
        DemandPaymentRequest data = (DemandPaymentRequest) redisUtil.getDataFromRedis(
            transactionId);

        log.info(data.toString());

        redisUtil.removeDataFromRedis(transactionId);

        PaymentGroup paymentGroup = PaymentGroup.toEntity(data);

        log.info(paymentGroup.toString());

        for (DemandPaymentCardRequest demandPaymentCardRequest : data.getPaymentCards()) {
            Payment payment = Payment.toEntity(demandPaymentCardRequest);

            //없으면 예외 터짐
            Card card = cardRepository.findById(demandPaymentCardRequest.getCardId()).get();
            card.addPayment(payment);

            paymentGroup.addPayment(payment);
            member.addPaymentGroup(paymentGroup);
        }

        return paymentDetailService.requestPaymentGroup(paymentGroup);
    }

    @Transactional
    @Override
    public SearchPaymentGroupResponse searchPaymentGroup(String token, int sort, int page, int size,
        LocalDate startDate, LocalDate endDate) {
        log.info("page: {}, size: {}, startDate: {}, endDate: {}", page, size, startDate, endDate);
        String accessToken = tokenProvider.extractAccessToken(token);
        UUID memberId = tokenProvider.getId(accessToken);

        Direction dir = (sort == 0) ? Direction.DESC : Direction.ASC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(dir, "transmissionDate"));

        Page<PaymentGroup> paymentGroups = paymentGroupRepository.findByMemberIdAndTransmissionDateBetween(
            memberId,
            startDate.atStartOfDay(), endDate.atTime(LocalTime.MAX), pageable);

        for (PaymentGroup paymentGroup : paymentGroups) {
            log.info(paymentGroup.toString());
        }

        MetaResponse meta = MetaResponse.builder()
            .total_count(paymentGroups.getTotalElements())
            .pagable_count(paymentGroups.getTotalPages())
            .build();

        List<TransactionResponse> transactions = paymentGroups.get()
            .map(paymentGroup -> TransactionResponse.builder()
                .id(paymentGroup.getId().toString())
                .storeName(paymentGroup.getStoreName())
                .detail(paymentGroup.getProductName())
                .price(paymentGroup.getTotalPrice())
                .paymentStatus(paymentGroup.getStatus())
                .build())
            .toList();

        return new SearchPaymentGroupResponse(meta, transactions);
    }

    @Transactional
    @Override
    public PaymentGroupResponse getPaymentGroup(String paymentGroupId) {
        PaymentGroup paymentGroup = paymentGroupRepository.findById(UUID.fromString(paymentGroupId))
            .orElseThrow();

        return paymentGroup.makeResponse();
    }

    @Transactional
    @Override
    public boolean refundPayment(RefundPaymentRequest refundPaymentRequest) {
        log.info("uuid: " + refundPaymentRequest.getPaymentId());
        PaymentGroup paymentGroup = paymentGroupRepository.findById(
            refundPaymentRequest.getPaymentId()).orElseThrow();

        return paymentDetailService.refundPaymentGroup(paymentGroup);
    }

    private boolean isNotSamePaymentPassword(Member member, String paymentPassword) {
        return member.getPassword().equals(paymentPassword);
    }
}
