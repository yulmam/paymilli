package com.paymilli.paymilli.domain.member.dto.request;

import com.paymilli.paymilli.domain.member.entity.Gender;
import lombok.Getter;

@Getter
public class AddMemberRequest {

    private String memberId;
    private String name;
    private String password;
    private String birthday;
    private Gender gender;
    private String phone;
    private String paymentPassword;

    public void setPassword(String password) {
        this.password = password;
    }
}
