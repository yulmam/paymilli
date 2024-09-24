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
import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    @Override
    public String issueTransactionId(String token, DemandPaymentRequest demandPaymentRequest) {
        String accessToken = tokenProvider.extractAccessToken(token);
        String memberId = tokenProvider.getMemberId(accessToken);

        //redis key
        Random random = new Random();
        int randomNumber = 100000 + random.nextInt(900000); // 6자리 난수 생성 (100000 ~ 999999)

        String transactionId = memberId + "-" + randomNumber;

        redisUtil.saveDataToRedis(transactionId, demandPaymentRequest, 86400 * 1000);

        return transactionId;
    }

    @Override
    public boolean approvePayment(String token, String transactionId,
        ApprovePaymentRequest approvePaymentRequest) {
        String accessToken = tokenProvider.extractAccessToken(token);
        Member member = memberRepository.findByMemberId(tokenProvider.getMemberId(accessToken))
            .orElseThrow();

        if (isNotSamePaymentPassword(member, approvePaymentRequest.getPassword())) {
            return false;
        }

        //redis로 데이터 가져옴
        DemandPaymentRequest data = (DemandPaymentRequest) redisUtil.getDataFromRedis(
            transactionId);

        PaymentGroup paymentGroup = PaymentGroup.toEntity(data);

        for (DemandPaymentCardRequest demandPaymentCardRequest : data.getPaymentCards()) {
            Payment payment = Payment.toEntity(demandPaymentCardRequest);

            //없으면 예외 터짐
            Card card = cardRepository.getReferenceById(demandPaymentCardRequest.getCardId());
            card.addPayment(payment);

            paymentGroup.addPayment(payment);
        }

        return paymentDetailService.requestPaymentGroup(paymentGroup);
    }

    @Override
    public SearchPaymentGroupResponse searchPaymentGroup(String token, int sort, int page, int size,
        LocalDate startDate, LocalDate endDate) {
        String accessToken = tokenProvider.extractAccessToken(token);
        String memberId = tokenProvider.getMemberId(accessToken);

        Direction dir = (sort == 0) ? Direction.DESC : Direction.ASC;

        Pageable pageable = PageRequest.of(page, size, dir, "transmission_date");

        Page<PaymentGroup> paymentGroups = paymentGroupRepository.findByMemberId(memberId,
            pageable);

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

    @Override
    public PaymentGroupResponse getPaymentGroup(String paymentGroupId) {
        PaymentGroup paymentGroup = paymentGroupRepository.findById(UUID.fromString(paymentGroupId))
            .orElseThrow();

        return paymentGroup.makeResponse();
    }

    @Override
    public boolean refundPayment(RefundPaymentRequest refundPaymentRequest) {
        PaymentGroup paymentGroup = paymentGroupRepository.findById(
            UUID.fromString(refundPaymentRequest.getPaymentId())).orElseThrow();

        return paymentDetailService.refundPaymentGroup(paymentGroup);
    }

    private boolean isNotSamePaymentPassword(Member member, String paymentPassword) {
        return member.getPassword().equals(paymentPassword);
    }
}
