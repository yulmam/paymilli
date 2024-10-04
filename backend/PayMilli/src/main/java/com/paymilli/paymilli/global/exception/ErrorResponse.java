package com.paymilli.paymilli.global.exception;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ErrorResponse {

    private final String errorCode;
    private final String errorMessage;

    public ErrorResponse(String errorCode, String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}

