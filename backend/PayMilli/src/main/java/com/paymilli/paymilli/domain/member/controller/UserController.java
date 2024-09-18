package com.paymilli.paymilli.domain.member.controller;

import com.paymilli.paymilli.domain.member.dto.UserDto;
import com.paymilli.paymilli.domain.member.entity.UserEntity;
import com.paymilli.paymilli.domain.member.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public String test() {
        return "1234";
    }

    @PostMapping("/signup")
    public ResponseEntity<UserEntity> signup(@RequestBody UserDto userDto) {
        return new ResponseEntity<>(userService.signup(userDto), HttpStatus.OK);
    }

    @PostMapping("/user")
    public ResponseEntity<String> getMyUserInfo() {
        return ResponseEntity.ok("user");
    }

    @PostMapping("/user/{username}")
    public ResponseEntity<String> getUserInfo(@PathVariable String username) {
        return ResponseEntity.ok("admin");
    }

}
