package com.paymilli.paymilli.domain.member.entity;

import com.paymilli.paymilli.domain.member.dto.request.AddMemberRequest;
import com.paymilli.paymilli.domain.member.dto.response.MemberInfoResponse;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "member")
public class Member {

    @Id
    @GeneratedValue
    @Column
    private UUID id;

//    card 개발시 제거 예정
//    @OneToMany(mappedBy = "member")
//    private List<Card> cards=new ArrayList<Card>();

//    paymentGroup 개발시 제거 예정
//    @OneToMany(mappedBy = "member")
//    private List<PaymentGroup> paymentGroups=new ArrayList<PaymentGroup>();

    @Column(nullable = false)
    private String memberId;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDateTime birthday;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(nullable = false)
    private String paymentPassword;

    @Column(nullable = false)
    private String userKey;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column
    private String refreshToken;

//    card 개발시 제거 예정
//    @OneToOne
//    @Column
//    private Card mainCard;

    @Column
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Column
    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

    @ColumnDefault("false")
    private boolean deleted;

//    card 개발시 제거 예정
//    연관관계 편의 메서드
//    public void addCard(Card card){
//        cards.add(card);
//        card.setMember(this);
//    }

//    paymentGroup 개발시 제거 예정
//    연관관계 편의 메서드
//    public void addPaymentGroup(PaymentGroup paymentGroup){
//        paymentGroups.add(paymentGroup);
//        paymentGroup.setMember(this);
//    }

    public static Member toEntity(AddMemberRequest addMemberRequest, String userKey,
        LocalDateTime birthday, String encodePassword, String encodePaymentPassword) {
        return Member.builder()
            .memberId(addMemberRequest.getMemberId())
            .password(encodePassword)
            .name(addMemberRequest.getName())
            .birthday(birthday)
            .gender(addMemberRequest.getGender())
            .role(Role.USER)
            .paymentPassword(encodePaymentPassword)
            .userKey(userKey)
            .email(addMemberRequest.getEmail())
            .phone(addMemberRequest.getPhone())
            .build();
    }

    public MemberInfoResponse makeResponse() {
        return MemberInfoResponse.builder()
            .memberId(memberId)
            .name(name)
            .email(email)
            .gender(gender)
            .phone(phone)
            .build();
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
