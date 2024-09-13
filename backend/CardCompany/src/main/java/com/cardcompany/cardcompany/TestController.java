package com.cardcompany.cardcompany;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/test")
public class TestController {

	@GetMapping("/1")
	public String test1() {
		return "hello";
	}
}
