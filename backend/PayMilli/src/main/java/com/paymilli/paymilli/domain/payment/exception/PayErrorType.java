package com.paymilli.paymilli.domain.payment.exception;

import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import lombok.Getter;

@Getter
public enum PayErrorType {

	LACK_OF_BALANCE("A1014", "잔액 부족"),
	EXCEEDED_ONE_TIME("A1016", "1회 한도 초과"),
	EXCEEDED_ONE_DAY("A1017", "1일 한도 초과");

	private static final Map<String, String> CODE_MAP = Collections.unmodifiableMap(
		Stream.of(values()).collect(Collectors.toMap(PayErrorType::getCardcompanyCode, PayErrorType::name)));

	private String cardcompanyCode;
	private String errorType;

	PayErrorType(String cardCompanyCode, String errorType) {
		this.cardcompanyCode = cardCompanyCode;
		this.errorType = errorType;
	}

	public static PayErrorType of(final String cardcompanyCode) {
		return PayErrorType.valueOf(CODE_MAP.get(cardcompanyCode));
	}
}
