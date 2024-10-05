package com.cardcompany.cardcompany.domain.transaction.exception;

import com.cardcompany.cardcompany.global.exception.BaseException;

public class InvalidRefundException extends BaseException {

    public InvalidRefundException() {
        super("A_INVALID_REFUND",
            "유효하지 않은 승인넘버 입니다.");
    }
}
