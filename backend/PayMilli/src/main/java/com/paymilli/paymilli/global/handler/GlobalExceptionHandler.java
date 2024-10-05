package com.paymilli.paymilli.global.handler;

import com.paymilli.paymilli.domain.payment.dto.response.ErrorCardResponse;
import com.paymilli.paymilli.domain.payment.exception.CardException;
import com.paymilli.paymilli.domain.payment.exception.PayErrorType;
import com.paymilli.paymilli.global.exception.BaseException;
import com.paymilli.paymilli.global.exception.BaseResponse;
import com.paymilli.paymilli.global.exception.BaseResponseStatus;
import com.paymilli.paymilli.global.exception.ClientException;
import com.paymilli.paymilli.global.exception.ErrorResponse;
import org.slf4j.MDC;
import org.springframework.http.HttpStatus;
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

	// 결제 오류시 발생
	@ExceptionHandler(CardException.class)
	public ResponseEntity<BaseResponse<ErrorCardResponse>> handleCardException(CardException e) {

		String clientMsg = String.valueOf(PayErrorType.of(e.getExcep().getCode()));

		ErrorCardResponse response = ErrorCardResponse.builder()
			.cardName(e.getCardName())
			.cardNumber(e.getCardLastNumber())
			.cause(clientMsg)
			.build();

		return new ResponseEntity<>(new BaseResponse<>(BaseResponseStatus.PAYMENT_ERROR, response), HttpStatus.BAD_REQUEST);
	}

    //webclient발생시 에러 핸들링
    @ExceptionHandler(ClientException.class)
    public ResponseEntity<ErrorResponse> handleException(ClientException e) {
        char code = e.getCode().charAt(0);//에러 내용을 분류하는 메인 character
        ErrorResponse errorResponse = ErrorResponse.builder()
            .errorCode(e.getCode())
            .errorMessage(e.getMessage())
            .build();
        if(code == 'A' || code == 'E')
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
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
