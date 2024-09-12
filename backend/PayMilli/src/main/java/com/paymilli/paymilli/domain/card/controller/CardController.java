package com.paymilli.paymilli.domain.card.controller;


import com.paymilli.paymilli.domain.card.dto.request.AddCardRequest;
import com.paymilli.paymilli.domain.card.dto.request.DeleteCardRequest;
import com.paymilli.paymilli.domain.card.dto.response.CardResponse;
import com.paymilli.paymilli.domain.card.service.CardService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/board")
public class CardController {

    private final CardService cardService;
    public CardController(CardService cardService){
        this.cardService = cardService;
    }

    @PostMapping
    public ResponseEntity<?> registerCard(@RequestBody AddCardRequest addCardRequest){
        //userId 수정 필요
        UUID userId = null;

        cardService.registerCard(addCardRequest, userId);

        return new ResponseEntity<>("정상적으로 등록되었습니다.", HttpStatus.OK);
    }


    @GetMapping
    public ResponseEntity<List<CardResponse>> searchCards(HttpServletRequest request){
        //userId 수정 필요
        UUID userId = null;
        return new ResponseEntity<>(cardService.searchCards(userId), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteCard(@RequestBody DeleteCardRequest deleteCardRequest, HttpServletRequest request){
        //userId 수정 필요
        UUID userId = null;
        cardService.deleteCard(deleteCardRequest.getCardId(), userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
