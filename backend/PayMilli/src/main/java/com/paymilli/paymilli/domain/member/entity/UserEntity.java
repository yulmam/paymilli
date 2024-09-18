package com.paymilli.paymilli.domain.member.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class UserEntity{

    @Id
    @JsonIgnore
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email", length = 50, unique = true)
    private String email;

    @Column(name = "username", length = 50)
    private String username;

    @JsonIgnore
    @Column
    private String password;

    @Column
    private LocalDateTime createDate;

    @ManyToMany
    @JoinTable(
        name = "user_authority",
        joinColumns = {@JoinColumn(name = "id", referencedColumnName = "id")},
        inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")}
    )
    private Set<AuthorityEntity> authorities;

}