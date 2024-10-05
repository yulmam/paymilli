package com.cardcompany.cardcompany.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class ClientException extends RuntimeException{

    String code;

    public ClientException(String code, String message) {
        super(message);
        this.code = code;
    }
}
