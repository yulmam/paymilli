package com.cardcompany.cardcompany;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

	@Autowired
	private MemberRepository memberRepository;

	public Member saveMember(String name) {
		Member member = new Member();
		member.setName(name);
		return memberRepository.save(member);
	}
}