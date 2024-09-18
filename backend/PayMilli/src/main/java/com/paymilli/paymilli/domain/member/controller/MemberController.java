package com.paymilli.paymilli.domain.member.controller;

import com.paymilli.paymilli.domain.member.dto.request.AddMemberRequest;
import com.paymilli.paymilli.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/join")
    public ResponseEntity<?> addMember(@RequestBody AddMemberRequest addMemberRequest) {
        memberService.addMember(addMemberRequest);

        return new ResponseEntity<>("정상적으로 가입되었습니다.", HttpStatus.OK);
    }
}
