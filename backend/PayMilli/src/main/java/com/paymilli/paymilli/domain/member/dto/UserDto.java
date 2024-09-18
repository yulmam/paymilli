package com.paymilli.paymilli.domain.member.dto;

import lombok.Data;

@Data
public class UserDto {
    private String email;
    private String password;
    private String name;
}
