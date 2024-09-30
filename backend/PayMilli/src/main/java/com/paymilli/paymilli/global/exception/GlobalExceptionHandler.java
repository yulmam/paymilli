package com.paymilli.paymilli.global.exception;

import org.slf4j.MDC;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
	@ExceptionHandler(BaseException.class)
	public ResponseEntity<BaseResponse<BaseException>> handleBaseException(BaseException e) {
		e.printStackTrace();
		log.info("[error handler requestId {}, status: {}, message: {}]", MDC.get("requestId"), e.getStatus(),
			e.getMessage());
		return ResponseEntity
			.status(HttpStatusCode.valueOf(e.getStatus().getCode()))
			.body(new BaseResponse<>(e.getStatus()));
	}

	// BaseException으로 정의하지 않은 runtime exception
	@ExceptionHandler(Exception.class)
	public ResponseEntity<BaseResponse<BaseException>> handleException(Exception e) {
		e.printStackTrace();
		log.info("[error handler requestId {}, status: {}, message: {}]", MDC.get("requestId"), "status",
			e.getMessage());

		return ResponseEntity
			.status(HttpStatusCode.valueOf(500))
			.body(new BaseResponse<>(BaseResponseStatus.SERVER_ERROR));
	}
}
