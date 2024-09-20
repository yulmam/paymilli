package com.cardcompany.cardcompany;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/members")
public class MemberController {

	@Autowired
	private MemberService memberService;

	@PostMapping("/create")
	public Member createMember(@RequestParam String name) {
		return memberService.saveMember(name);
	}
}
