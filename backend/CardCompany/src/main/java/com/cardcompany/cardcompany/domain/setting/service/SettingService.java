package com.cardcompany.cardcompany.domain.setting.service;

import com.cardcompany.cardcompany.domain.setting.dto.dto.request.CardInsertRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface SettingService {

    void insertCard(CardInsertRequest request);
}
