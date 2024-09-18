package com.paymilli.paymilli.domain.member.service;

import com.paymilli.paymilli.domain.member.dto.UserDto;
import com.paymilli.paymilli.domain.member.entity.AuthorityEntity;
import com.paymilli.paymilli.domain.member.entity.UserEntity;
import com.paymilli.paymilli.domain.member.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserEntity signup(UserDto userDto) {

        if(userRepository.findOneWithAuthoritiesByEmail(userDto.getEmail()).orElse(null) != null) {
            throw new RuntimeException("이미 가입되어 있는 유저 입니다.");
        }

        AuthorityEntity authority = AuthorityEntity.builder()
            .authorityName("USER")
            .build();

        UserEntity user = UserEntity.builder()
            .email(userDto.getEmail())
            .password(passwordEncoder.encode(userDto.getPassword()))
            .username(userDto.getName())
            .authorities(Collections.singleton(authority))
            .createDate(LocalDateTime.now())
            .build();

        return userRepository.save(user);
    }

}
