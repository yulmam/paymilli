package com.cardcompany.cardcompany.domain.transaction.dto.client;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberSearchRequest {
    private String apiKey;
    private String userId;

    public MemberSearchRequest(String userId) {
        apiKey = "8cdca4197e95472e9e2947dedeaf6f72";
        this.userId = userId;
    }
}
