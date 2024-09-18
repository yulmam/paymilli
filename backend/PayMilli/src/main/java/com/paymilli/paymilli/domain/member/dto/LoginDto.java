package com.paymilli.paymilli.domain.member.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class LoginDto {
    private String email;
    private String password;
}