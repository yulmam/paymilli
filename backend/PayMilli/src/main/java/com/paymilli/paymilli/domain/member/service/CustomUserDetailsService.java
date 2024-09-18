package com.paymilli.paymilli.domain.member.service;

import com.paymilli.paymilli.domain.member.entity.UserEntity;
import com.paymilli.paymilli.domain.member.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserEntity userEntity = userRepository.findOneWithAuthoritiesByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException("유저정보가 없습니다."));

        List<GrantedAuthority> grantedAuthorities = userEntity.getAuthorities().stream()
            .map(authority -> new SimpleGrantedAuthority(authority.getAuthorityName()))
            .collect(Collectors.toList());

        return User.builder()
            .username(userEntity.getEmail())
            .password(userEntity.getPassword())
            .authorities(grantedAuthorities)
            .build();
    }
}