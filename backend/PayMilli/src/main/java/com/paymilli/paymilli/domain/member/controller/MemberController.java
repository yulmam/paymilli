package com.paymilli.paymilli.domain.member.controller;

import com.paymilli.paymilli.domain.member.dto.request.AddMemberRequest;
import com.paymilli.paymilli.domain.member.dto.request.LoginRequest;
import com.paymilli.paymilli.domain.member.dto.response.LoginResponse;
import com.paymilli.paymilli.domain.member.jwt.JwtFilter;
import com.paymilli.paymilli.domain.member.jwt.TokenProvider;
import com.paymilli.paymilli.domain.member.service.MemberService;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;


    @PostMapping("/join")
    public ResponseEntity<?> addMember(@RequestBody AddMemberRequest addMemberRequest) {
        memberService.addMember(addMemberRequest);

        return new ResponseEntity<>("정상적으로 가입되었습니다.", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken token =
            new UsernamePasswordAuthenticationToken(loginRequest.getMemberId(),
                loginRequest.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject()
            .authenticate(token);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String refreshToken = tokenProvider.createRefreshToken(authentication);
        String accessToken = tokenProvider.createAccessToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + accessToken);

        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true); // JavaScript에서 쿠키 접근을 막음
        refreshTokenCookie.setSecure(true);   // HTTPS를 통해서만 전송되도록 설정
        refreshTokenCookie.setPath("/");      // 쿠키가 전체 도메인에서 사용될 수 있도록 설정
        refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60); // 쿠키의 유효 기간을 7일로 설정 (필요에 따라 조정)

        httpHeaders.add("Set-Cookie", refreshTokenCookie.toString());

        return new ResponseEntity<>(new LoginResponse(accessToken),
            httpHeaders, HttpStatus.OK);
    }

    @GetMapping("/info")
    public ResponseEntity<?> getInfo(@RequestHeader("Authorization") String accessToken) {
        String token = accessToken.split(" ")[1];
        String memberId = tokenProvider.getMemberId(token);

        return new ResponseEntity<>(memberService.getMemberInfo(memberId), HttpStatus.OK);
    }
}
