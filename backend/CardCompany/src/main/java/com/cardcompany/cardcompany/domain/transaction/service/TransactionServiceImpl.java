package com.cardcompany.cardcompany.domain.transaction.service;

import com.cardcompany.cardcompany.domain.transaction.client.TransactionClient;
import com.cardcompany.cardcompany.domain.transaction.dto.client.MemberSearchRequest;
import com.cardcompany.cardcompany.domain.transaction.dto.client.UpdateDemandDepositAccountDepositResponse;
import com.cardcompany.cardcompany.domain.transaction.dto.client.UpdateDemandDepositAccountWithdrawalRequest;
import com.cardcompany.cardcompany.domain.transaction.dto.client.UpdateDemandDepositAccountWithdrawalResponse;
import com.cardcompany.cardcompany.domain.transaction.dto.request.CardValidationRequest;
import com.cardcompany.cardcompany.domain.transaction.dto.request.PayRequest;
import com.cardcompany.cardcompany.domain.transaction.dto.response.CardInfoResponse;
import com.cardcompany.cardcompany.domain.transaction.dto.response.DepositResponse;
import com.cardcompany.cardcompany.domain.transaction.dto.response.PayResponse;
import com.cardcompany.cardcompany.domain.transaction.dto.response.userKeyResponse;
import com.cardcompany.cardcompany.domain.transaction.entity.Card;
import com.cardcompany.cardcompany.domain.transaction.entity.CardType;
import com.cardcompany.cardcompany.domain.transaction.entity.Installment;
import com.cardcompany.cardcompany.domain.transaction.entity.InstallmentStatus;
import com.cardcompany.cardcompany.domain.transaction.entity.Payment;
import com.cardcompany.cardcompany.domain.transaction.entity.PaymentStatus;
import com.cardcompany.cardcompany.domain.transaction.exception.IncorrectPasswordException;
import com.cardcompany.cardcompany.domain.transaction.exception.InvalidCardException;
import com.cardcompany.cardcompany.domain.transaction.exception.InvalidRefundException;
import com.cardcompany.cardcompany.domain.transaction.repository.CardRepository;
import com.cardcompany.cardcompany.domain.transaction.repository.InstallmentRepository;
import com.cardcompany.cardcompany.domain.transaction.repository.PaymentRepository;
import com.cardcompany.cardcompany.domain.transaction.util.ApproveNumberUtils;
import com.cardcompany.cardcompany.global.config.PropertiesConfig;
import com.cardcompany.cardcompany.global.properties.KeyProperties;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionClient transactionClient;
    private final CardRepository cardRepository;
    private final ApproveNumberUtils approveNumberUtils;
    private final PaymentRepository paymentRepository;
    private final InstallmentRepository installmentRepository;
    private final KeyProperties keyProperties;

    public TransactionServiceImpl(TransactionClient transactionClient,
        CardRepository cardRepository, ApproveNumberUtils approveNumberUtils,
        PaymentRepository paymentRepository, InstallmentRepository installmentRepository,
        KeyProperties keyProperties) {
        this.transactionClient = transactionClient;
        this.cardRepository = cardRepository;
        this.approveNumberUtils = approveNumberUtils;
        this.paymentRepository = paymentRepository;
        this.installmentRepository = installmentRepository;
        this.keyProperties = keyProperties;
    }


    @Override
    public userKeyResponse getApiKey(String email) {
        return transactionClient.getApiKey(new MemberSearchRequest(email))
            .makeApiKeyResponse();
    }

    @Override
    public CardInfoResponse getCardInfo(CardValidationRequest request) {
        Card card = cardRepository
            .findByCardNumberAndCvcAndExpirationDateAndUserKey(
                request.getCardNumber(),
                request.getCvc(),
                request.getExpirationDate(),
                request.getUserKey()
            )
            .orElseThrow(InvalidCardException::new);

        checkPassword(request.getCardPassword(), card.getCardPassword());

        return card.makeCardInfoResponse();
    }

    @Override
    public PayResponse pay(PayRequest request) {
        Card card = cardRepository
            .findByCardNumberAndCvcAndExpirationDate(
                request.getCardNumber(),
                request.getCvc(),
                request.getExpirationDate()
            )
            .orElseThrow(InvalidCardException::new);

        CardType cardType = card.getCardType();
        if (cardType == CardType.CHECK) {
            return new PayResponse(checkPaymentImpl(card, request));
        }
        //체크카드가 아니면 바로 신용카드
        return new PayResponse(creditPayment(card, request));
    }

    @Override
    public void refund(String approveNumber) {
        Payment payment = paymentRepository.findByApproveNumber(approveNumber)
            .orElseThrow(InvalidRefundException::new);

        Card userCard = payment.getCard();

        if (userCard.getCardType() == CardType.CHECK) {
            checkRefund(payment);
        }
        if (userCard.getCardType() == CardType.CREDIT) {
            creditRefund(payment);
        }
    }

    public void checkRefund(Payment payment) {
        transactionClient.refundCheck(
            payment.makeUpdateDemandDepositAccountDepositRequest(keyProperties.getApikey())
        );
        paymentRepository.delete(payment);
    }

    public void creditRefund(Payment payment) {
        List<Installment> installments = payment.getInstallments();
        for (Installment installment : installments) {
            if (installment.getInstallmentStatus() == InstallmentStatus.PAID) {

            }
            installmentRepository.delete(installment);
        }
        paymentRepository.delete(payment);
    }

    public String checkPayment(Card card, PayRequest request) {
        String approveNumber = approveNumberUtils.makeApproveNumber(card.getCardType());

        transactionClient.payCheck(
            card.makeUpdateDemandDepositAccountWithdrawalResponse(
                String.valueOf(request.getPrice()),
                keyProperties.getApikey()
            )
        );

        paymentRepository.save(
            Payment.builder()
                .price(request.getPrice())
                .storeName(request.getStoreName())
                .paymentStatus(PaymentStatus.PAID)
                .approveNumber(approveNumber)
                .card(card)
                .build()
        );
        return approveNumber;
    }

    public String checkPaymentImpl(Card card, PayRequest request) {
        String approveNumber = approveNumberUtils.makeApproveNumber(card.getCardType());

        //payment가 된다면
        transactionClient.payTransfer(
            card.makeUpdateDemandDepositAccountTransferRequest(
                String.valueOf(request.getPrice()),
                keyProperties.getApikey()
            )
        );

        paymentRepository.save(
            Payment.builder()
                .price(request.getPrice())
                .storeName(request.getStoreName())
                .paymentStatus(PaymentStatus.PAID)
                .approveNumber(approveNumber)
                .card(card)
                .build()
        );

        return approveNumber;
    }

    public String creditPayment(Card card, PayRequest request) {
        String approveNumber = approveNumberUtils.makeApproveNumber(card.getCardType());

        Payment payment = Payment.builder()
            .price(request.getPrice())
            .storeName(request.getStoreName())
            .paymentStatus(PaymentStatus.PAID)
            .approveNumber(approveNumber)
            .card(card)
            .build();
        paymentRepository.save(payment);

        for (int idx = 0, installmentMonth = request.getInstallment(); idx < installmentMonth;
            idx++) {
            Installment installment = Installment.builder()
                .installmentDate(LocalDate.now().plusMonths(idx))
                .installmentStatus(InstallmentStatus.WAITING)
                .price(request.getPrice() / installmentMonth)
                .payment(payment)
                .build();
        }

        installmentRepository.saveAll(payment.getInstallments());
        return approveNumber;
    }

    //카드 패스워드 앞 두자리만 체크
    private void checkPassword(String requestPassword, String userPassword) {
        String twoDigitsPassword = userPassword.substring(0, 2);
        if(!twoDigitsPassword.equals(requestPassword))
            throw new IncorrectPasswordException();
    }
}
