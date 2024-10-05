package com.cardcompany.cardcompany.global.handler.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClientErrorResponse {
    private String responseCode;
    private String responseMessage;
}
