package com.cardcompany.cardcompany.domain.transaction.advice;

import com.cardcompany.cardcompany.domain.transaction.exception.InvalidCardException;
import com.cardcompany.cardcompany.domain.transaction.exception.InvalidRefundException;
import com.cardcompany.cardcompany.global.dto.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class TransactionExceptionHandler {

    @ExceptionHandler(InvalidCardException.class)
    public ResponseEntity<ErrorResponse> InvalidCardExceptionHandler(InvalidCardException e) {
        ErrorResponse errorResponse = ErrorResponse.builder()
            .code(e.getCode())
            .message(e.getMessage())
            .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidRefundException.class)
    public ResponseEntity<ErrorResponse> InvalidCardExceptionHandler(InvalidRefundException e) {
        ErrorResponse errorResponse = ErrorResponse.builder()
            .code(e.getCode())
            .message(e.getMessage())
            .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}
