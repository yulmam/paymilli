package com.cardcompany.cardcompany.domain.transaction.exception;

import com.cardcompany.cardcompany.global.exception.BaseException;

public class IncorrectPasswordException extends BaseException {

    public IncorrectPasswordException() {
        super("A_INCORRECT_PASSWORD", "비밀번호가 일치하지 않습니다");
    }
}
