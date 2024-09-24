package com.paymilli.paymilli.domain.payment.service;

import org.springframework.stereotype.Service;

import com.paymilli.paymilli.domain.card.entity.Card;
import com.paymilli.paymilli.domain.payment.client.PaymentClient;
import com.paymilli.paymilli.domain.payment.dto.request.cardcompany.PaymentInfoRequest;
import com.paymilli.paymilli.domain.payment.dto.request.cardcompany.PaymentRefundRequest;
import com.paymilli.paymilli.domain.payment.dto.response.cardcompany.PaymentInfoResponse;
import com.paymilli.paymilli.domain.payment.entity.Payment;
import com.paymilli.paymilli.domain.payment.entity.PaymentGroup;
import com.paymilli.paymilli.domain.payment.entity.PaymentStatus;
import com.paymilli.paymilli.domain.payment.exception.PaymentCardException;
import com.paymilli.paymilli.domain.payment.exception.PaymentMilliException;
import com.paymilli.paymilli.domain.payment.repository.PaymentGroupRepository;
import com.paymilli.paymilli.domain.payment.repository.PaymentRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PaymentDetailServiceImpl implements PaymentDetailService {

	private final PaymentClient paymentClient;
	private final PaymentRepository paymentRepository;
	private final PaymentGroupRepository paymentGroupRepository;

	@Override
	public boolean requestPaymentGroup(PaymentGroup paymentGroup) {

		// 결제 성공 유무
		boolean paymentSuccess = true;

		int paymentIdx = 0;
		int paymentGroupSize = paymentGroup.getPayments().size();
		String[] approveNumbers = new String[paymentGroupSize];

		try{
			// 순서대로 결제 진행
			for (; paymentIdx < paymentGroupSize; paymentIdx++) {
				// 결제승인 코드 저장
				approveNumbers[paymentIdx] = requestSinglePayment(paymentGroup.getPayments().get(paymentIdx), paymentGroup.getStoreName());
			}
		}catch (PaymentMilliException e) {
			paymentSuccess = false;

			// 이전 내역 환불 처리
			for (int i = 0; i < paymentIdx; i++) {
				requestSingleRefund(approveNumbers[i]);
			}

		}finally {
			// 성공시 결제 내역 DB 저장
			if(paymentSuccess){
				for (int i = 0; i < paymentGroupSize; i++) {
					Payment payment = paymentGroup.getPayments().get(i);

					// 결제 승인번호 주입
					payment.setApproveNumber(approveNumbers[i]);
					paymentRepository.save(payment);
				}

				paymentGroupRepository.save(paymentGroup);
			}
		}

		return paymentSuccess;
	}

	private String requestSinglePayment(Payment payment, String storeName) throws PaymentMilliException {

		Card card = payment.getCard();

		// 결제 요청
		PaymentInfoResponse response = paymentClient.requestPayment(
			new PaymentInfoRequest(storeName, payment.getPrice(), card.getCardNumber(), card.getCVC(),
				card.getExpirationDate(), payment.getInstallment()));

		return response.getApproveNumber();
	}


	@Override
	public boolean refundPaymentGroup(PaymentGroup paymentGroup) {

		int paymentGroupSize = paymentGroup.getPayments().size();

		for (int i = 0; i < paymentGroupSize; i++) {
			requestSingleRefund(paymentGroup.getPayments().get(i).getApproveNumber());
		}

		// 환불 처리
		paymentGroup.setStatus(PaymentStatus.REFUND);

		// 일단 전부 환불 성공 처리
		return true;
	}

	private boolean requestSingleRefund(String approveNumber){

		try{
			paymentClient.requestRefund(new PaymentRefundRequest(approveNumber));
		}catch (PaymentCardException e) {
			return false;
		}

		return true;
	}

}
