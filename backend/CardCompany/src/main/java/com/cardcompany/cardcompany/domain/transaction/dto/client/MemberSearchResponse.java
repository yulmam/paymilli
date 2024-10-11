package com.cardcompany.cardcompany.domain.transaction.dto.client;

import com.cardcompany.cardcompany.domain.transaction.dto.response.userKeyResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberSearchResponse {
    private String userId;
    private String userName;
    private String institutionCode;
    private String userKey;
    private String created;
    private String modified;

    public userKeyResponse makeApiKeyResponse() {
        return new userKeyResponse(userKey);
    }
}
