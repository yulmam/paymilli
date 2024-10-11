package com.cardcompany.cardcompany.global.header;


import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.ThreadLocalRandom;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@NoArgsConstructor
public class GlobalHeaderRequest {

    private String apiName;
    private String transmissionDate;
    private String transmissionTime;
    private String institutionCode;
    private String fintechAppNo;
    private String apiServiceCode;
    private String institutionTransactionUniqueNo;
    private String apiKey;
    private String userKey;

    public GlobalHeaderRequest(String apiName, String apiKey, String userKey) {
        this.apiName = apiName;
        setTransmissionDateAndTime();
        this.institutionCode = "00100";
        this.fintechAppNo = "001";
        this.apiServiceCode = apiName;
        makeUniqueTransactionCode();
        this.apiKey = apiKey;
        this.userKey = userKey;
    }

    private void setTransmissionDateAndTime() {
        LocalDateTime now = LocalDateTime.now();
        this.transmissionDate = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        this.transmissionTime = now.format(DateTimeFormatter.ofPattern("HHmmss"));
        log.info(transmissionDate);
        log.info(transmissionTime);
    }

    private void makeUniqueTransactionCode() {
        StringBuilder uniqueCode = new StringBuilder();
        uniqueCode.append(transmissionDate);
        uniqueCode.append(transmissionTime);
        String randomCode = String.valueOf(ThreadLocalRandom.current().nextInt(100000, 1000000));
        uniqueCode.append(randomCode);
        this.institutionTransactionUniqueNo = uniqueCode.toString();
    }
}
