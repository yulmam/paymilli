package com.cardcompany.cardcompany.domain.transaction.exception;

import com.cardcompany.cardcompany.global.exception.BaseException;

public class InvalidCardException extends BaseException {

    public InvalidCardException() {
        super("A_INVALID_CARD",
                "유효하지 않은 카드입니다.");
    }
}
