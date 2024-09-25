package com.paymilli.paymilli.domain.card.controller;


import com.paymilli.paymilli.domain.card.dto.request.AddCardRequest;
import com.paymilli.paymilli.domain.card.dto.request.DeleteCardRequest;
import com.paymilli.paymilli.domain.card.dto.response.CardResponse;
import com.paymilli.paymilli.domain.card.service.CardService;
import com.paymilli.paymilli.domain.member.jwt.TokenProvider;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/card")
public class CardController {

    private final CardService cardService;
    private final TokenProvider tokenProvider;

    public CardController(CardService cardService, TokenProvider tokenProvider) {
        this.cardService = cardService;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping
    public ResponseEntity<?> registerCard(
        @RequestHeader("Authorization") String token,
        @RequestBody AddCardRequest addCardRequest) {
        //userId 수정 필요
        String accessToken = tokenProvider.extractAccessToken(token);
        UUID memberId = tokenProvider.getId(accessToken);

        cardService.registerCard(addCardRequest, memberId);

        return new ResponseEntity<>("정상적으로 등록되었습니다.", HttpStatus.OK);
    }


    @GetMapping
    public ResponseEntity<List<CardResponse>> searchCards(
        @RequestHeader("Authorization") String token) {
        //userId 수정 필요
        String accessToken = tokenProvider.extractAccessToken(token);
        UUID memberId = tokenProvider.getId(accessToken);
        return new ResponseEntity<>(cardService.searchCards(memberId), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteCard(@RequestHeader("Authorization") String token,
        @RequestBody DeleteCardRequest deleteCardRequest) {
        //userId 수정 필요
        String accessToken = tokenProvider.extractAccessToken(token);
        UUID memberId = tokenProvider.getId(accessToken);

        cardService.deleteCard(deleteCardRequest.getCardId(), memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
