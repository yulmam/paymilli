package com.paymilli.paymilli.domain.member.controller;

import com.paymilli.paymilli.domain.member.dto.LoginDto;
import com.paymilli.paymilli.domain.member.dto.TokenDto;
import com.paymilli.paymilli.domain.member.jwt.JwtFilter;
import com.paymilli.paymilli.domain.member.jwt.TokenProvider;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @PostMapping("/authenticate")
    public ResponseEntity<TokenDto> authorize(@RequestBody LoginDto loginDto) {
        log.info("loginDto: {}", loginDto);
        UsernamePasswordAuthenticationToken token =
            new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(token);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String refreshToken = tokenProvider.createRefreshToken(authentication);
        String accessToken = tokenProvider.createAccessToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + accessToken);

        ResponseEntity<TokenDto> responseEntity =new ResponseEntity<>(new TokenDto(accessToken), httpHeaders, HttpStatus.OK);

        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true); // JavaScript에서 쿠키 접근을 막음
        refreshTokenCookie.setSecure(true);   // HTTPS를 통해서만 전송되도록 설정
        refreshTokenCookie.setPath("/");      // 쿠키가 전체 도메인에서 사용될 수 있도록 설정
        refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60); // 쿠키의 유효 기간을 7일로 설정 (필요에 따라 조정)

        responseEntity.getHeaders().add("Set-Cookie", refreshTokenCookie.toString());

        return responseEntity;
    }

}