package com.paymilli.paymilli.domain.payment.client;

import java.nio.charset.StandardCharsets;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import com.paymilli.paymilli.domain.payment.dto.request.cardcompany.PaymentInfoRequest;
import com.paymilli.paymilli.domain.payment.dto.request.cardcompany.PaymentRefundRequest;
import com.paymilli.paymilli.domain.payment.dto.response.cardcompany.PaymentInfoResponse;
import com.paymilli.paymilli.domain.payment.dto.response.cardcompany.PaymentRefundResponse;
import com.paymilli.paymilli.domain.payment.exception.PaymentCardException;

import reactor.core.publisher.Mono;

@Component
public class PaymentClient {

	private final WebClient webClient;

	public PaymentClient(WebClient webClient) {
		this.webClient = webClient;
	}

	public PaymentInfoResponse requestPayment(PaymentInfoRequest paymentInfoRequest){

		return webClient.post()
			.uri("http://j11a702.p.ssafy.io/api/v1/cardcompany/payment")
			.accept(MediaType.APPLICATION_JSON)
			.acceptCharset(StandardCharsets.UTF_8)
			.bodyValue(paymentInfoRequest)
			.exchangeToMono(clientResponse -> {
				HttpStatus statusCode = (HttpStatus)clientResponse.statusCode();

				if (statusCode.is2xxSuccessful()) {
					// 성공적인 응답 처리
					return clientResponse.bodyToMono(PaymentInfoResponse.class);
				} else if (statusCode == HttpStatus.UNAUTHORIZED) {
					// 401 Unauthorized 처리 / 한도 초과
					return clientResponse.bodyToMono(String.class)
						.flatMap(errorBody -> Mono.error(new PaymentCardException("Over the limit: " + errorBody)));
				} else if (statusCode == HttpStatus.PAYMENT_REQUIRED) {
					// 402 Payment Required 처리 / 잔액 부족
					return clientResponse.bodyToMono(String.class)
						.flatMap(errorBody -> Mono.error(new PaymentCardException("Lack of balance: " + errorBody)));
				} else {
					// 예외적인 상태 코드 처리
					return Mono.error(new IllegalStateException("Unexpected status code: " + statusCode));
				}
			})
			.blockOptional()
			.orElseThrow();
	}

	public PaymentRefundResponse requestRefund(PaymentRefundRequest paymentRefundRequest){
		return webClient.post()
			.uri("http://j11a702.p.ssafy.io/api/v1/cardcompany/refund")
			.accept(MediaType.APPLICATION_JSON)
			.acceptCharset(StandardCharsets.UTF_8)
			.bodyValue(paymentRefundRequest)
			.exchangeToMono(clientResponse -> {
				HttpStatus statusCode = (HttpStatus)clientResponse.statusCode();

				if (statusCode.is2xxSuccessful()) {
					// 성공적인 응답 처리
					return clientResponse.bodyToMono(PaymentRefundResponse.class);
				} else if (statusCode.is4xxClientError()) {
					// 401 Unauthorized 처리 / 실패
					return clientResponse.bodyToMono(String.class)
						.flatMap(errorBody -> Mono.error(new PaymentCardException("refund fail: " + errorBody)));
				}else{
					// 예외적인 상태 코드 처리
					return Mono.error(new IllegalStateException("Unexpected status code: " + statusCode));
				}
			})
			.blockOptional()
			.orElseThrow();
	}

	public String testRequestToCardCompany(){
		String response = webClient.get()
			.uri("http://j11a702.p.ssafy.io/api/v1/cardcompany/test/1")
			.accept(MediaType.APPLICATION_JSON)
			.acceptCharset(StandardCharsets.UTF_8)
			.retrieve()
			.bodyToMono(String.class)
			.blockOptional()
			.orElseThrow();

		return response;
	}
}
