package com.paymilli.paymilli.global.exception;

import lombok.Getter;

/**
 * 에러 코드 관리
 */
@Getter
public enum BaseResponseStatus {
    /**
     * 200 : 요청 성공
     */
    SUCCESS(200, "요청에 성공하였습니다."),
    SUCCESS_PAYMENT(200, "결제가 정상처리 되었습니다."),
    SUCCESS_MEMBER_CREATED(404, "정상적으로 가입되었습니다"),
    SUCCESS_CREATING(201, "생성에 성공하였습니다."),
    /**
     * 401 JWT 관련 에러
     */
    UNAUTHORIZED(401, "access token이 유효하지 않습니다."),

    /**
     * 404 리소스 못 찾는 에러
     */
    MEMBER_NOT_FOUND(404, "멤버를 찾을 수 없습니다."),
    RESOURCE_NOT_FOUND(404, "리소스를 찾을 수 없습니다."),
    PAYMENT_ERROR(404, "결제 오류가 발생하였습니다."),
    REFUND_ERROR(404, "환불 오류가 발생하였습니다."),

    /**
     * 이미 존재하는 데이터
     */
    MEMBER_ALREADY_EXIST(409, "이미 가입되어 있는 사용자 입니다."),

    /**
     * 인프라 에러
     */
    SERVER_ERROR(500, "서버 에러");


    private final int code;
    private final String message;

    BaseResponseStatus(int code,
        String message) { //BaseResponseStatus 에서 각 해당하는 코드를 생성자로 맵핑
        this.code = code;
        this.message = message;
    }
}
