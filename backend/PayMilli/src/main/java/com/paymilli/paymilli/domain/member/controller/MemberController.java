package com.paymilli.paymilli.domain.member.controller;

import com.paymilli.paymilli.domain.member.dto.request.AddMemberRequest;
import com.paymilli.paymilli.domain.member.dto.request.LoginRequest;
import com.paymilli.paymilli.domain.member.dto.request.TokenRequest;
import com.paymilli.paymilli.domain.member.dto.request.UpdatePaymentPasswordRequest;
import com.paymilli.paymilli.domain.member.dto.request.ValidatePaymentPasswordRequest;
import com.paymilli.paymilli.domain.member.dto.response.LoginResponse;
import com.paymilli.paymilli.domain.member.dto.response.TokenResponse;
import com.paymilli.paymilli.domain.member.jwt.JwtFilter;
import com.paymilli.paymilli.domain.member.jwt.TokenProvider;
import com.paymilli.paymilli.domain.member.service.MemberService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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


    @PostMapping("/join")
    public ResponseEntity<?> addMember(@RequestBody AddMemberRequest addMemberRequest) {
        memberService.addMember(addMemberRequest);

        return new ResponseEntity<>("정상적으로 가입되었습니다.", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest,
        HttpServletResponse response) {

        TokenRequest tokenRequest = new TokenRequest(loginRequest.getMemberId(),
            loginRequest.getPassword());

        TokenResponse tokenResponse = memberService.issueTokens(tokenRequest);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + tokenResponse.getAccessToken());

        Cookie refreshTokenCookie = generateRefreshTokenCookie(tokenResponse.getRefreshToken());
        response.addCookie(refreshTokenCookie);

        return new ResponseEntity<>(new LoginResponse(tokenResponse.getAccessToken()),
            httpHeaders, HttpStatus.OK);
    }

    @GetMapping("/info")
    public ResponseEntity<?> getInfo(@RequestHeader("Authorization") String token) {
        String accessToken = tokenProvider.extractAccessToken(token);
        UUID memberId = tokenProvider.getId(accessToken);

        return new ResponseEntity<>(memberService.getMemberInfo(memberId), HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String token) {
        String accessToken = tokenProvider.extractAccessToken(token);
        UUID memberId = tokenProvider.getId(accessToken);

        memberService.logoutMember(memberId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(
        @CookieValue(value = "refreshToken", required = false) String refreshToken) {

        if (refreshToken == null) {
            log.info("refreshToken not found");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (tokenProvider.validateToken(refreshToken)) {
            if (memberService.isSameRefreshToken(refreshToken)) {
                String accessToken = memberService.reissueAccessToken(refreshToken);

                return new ResponseEntity<>(new LoginResponse(accessToken), HttpStatus.OK);
            }
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteMember(@RequestHeader("Authorization") String token) {
        String accessToken = tokenProvider.extractAccessToken(token);
        UUID memberId = tokenProvider.getId(accessToken);

        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/payment/password")
    public ResponseEntity<?> updateMember(@RequestHeader("Authorization") String token,
        @RequestBody UpdatePaymentPasswordRequest updatePaymentPasswordRequest) {

        String accessToken = tokenProvider.extractAccessToken(token);
        UUID memberId = tokenProvider.getId(accessToken);

        memberService.updatePaymentPassword(memberId, updatePaymentPasswordRequest);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/payment/password")
    public ResponseEntity<?> validatePaymentPassword(@RequestHeader("Authorization") String token,
        @RequestBody ValidatePaymentPasswordRequest validatePaymentPasswordRequest) {

        String accessToken = tokenProvider.extractAccessToken(token);
        UUID memberId = tokenProvider.getId(accessToken);

        return new ResponseEntity<>(
            memberService.validatePaymentPassword(memberId, validatePaymentPasswordRequest),
            HttpStatus.OK);
    }


    private Cookie generateRefreshTokenCookie(String refreshToken) {
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true); // JavaScript에서 쿠키 접근을 막음
        refreshTokenCookie.setSecure(true);   // HTTPS를 통해서만 전송되도록 설정
        refreshTokenCookie.setPath("/");      // 쿠키가 전체 도메인에서 사용될 수 있도록 설정
        refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60); // 쿠키의 유효 기간을 7일로 설정 (필요에 따라 조정)

        return refreshTokenCookie;
    }
}
