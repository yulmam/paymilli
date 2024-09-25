package com.cardcompany.cardcompany.global.exception;


import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class BaseException extends RuntimeException {

    String code;

    public BaseException(String code, String message) {
        super(message);
        this.code = code;
    }
}
