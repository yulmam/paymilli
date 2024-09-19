package com.paymilli.paymilli.domain.member.service;

//@Component
//@RequiredArgsConstructor
//public class CustomUserDetailsService implements UserDetailsService {
//
//    private final UserRepository userRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//
//        UserEntity userEntity = userRepository.findOneWithAuthoritiesByEmail(username)
//            .orElseThrow(() -> new UsernameNotFoundException("유저정보가 없습니다."));
//
//        List<GrantedAuthority> grantedAuthorities = userEntity.getAuthorities().stream()
//            .map(authority -> new SimpleGrantedAuthority(authority.getAuthorityName()))
//            .collect(Collectors.toList());
//
//        return User.builder()
//            .username(userEntity.getEmail())
//            .password(userEntity.getPassword())
//            .authorities(grantedAuthorities)
//            .build();
//    }
//}