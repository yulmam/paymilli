package com.cardcompany.cardcompany.global.advice;

import com.cardcompany.cardcompany.global.dto.response.ErrorResponse;
import com.cardcompany.cardcompany.global.exception.BaseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<?> handleBaseException(BaseException e) {
        ErrorResponse errorResponse = ErrorResponse.builder()
            .code(e.getCode())
            .message(e.getMessage())
            .build();

        char code = e.getCode().charAt(0);

        //A는 사용자가 잘못된 요청을 했을 떄
        //E는 계정 인증에 실패한 요청을 보낼 때
        if(code == 'A' || code == 'E')
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        else
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
