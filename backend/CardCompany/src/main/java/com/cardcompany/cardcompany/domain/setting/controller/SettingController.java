package com.cardcompany.cardcompany.domain.setting.controller;

import com.cardcompany.cardcompany.domain.setting.dto.dto.request.CardInsertRequest;
import com.cardcompany.cardcompany.domain.setting.service.SettingService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/setting")
public class SettingController {

    private final SettingService settingService;

    public SettingController(SettingService settingService) {
        this.settingService = settingService;
    }

    @PostMapping("/insert")
    public ResponseEntity<?> insert(@RequestBody CardInsertRequest request) {
        settingService.insertCard(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
