package com.paymilli.paymilli.domain.card.controller;


import com.paymilli.paymilli.domain.card.dto.request.AddCardRequest;
import com.paymilli.paymilli.domain.card.service.CardService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

        if(!cardService.isAlreadyRegister(addCardRequest.getCardNumber(), userId))
            return new ResponseEntity<>("이미 등록된 카드입니다.", HttpStatus.BAD_REQUEST);

        cardService.checkValidation(addCardRequest);

        cardService.registerCard(addCardRequest, userId);

        return new ResponseEntity<>("정상적으로 등록되었습니다.", HttpStatus.OK);
    }


    @GetMapping
    public ResponseEntity<?> searchCards(HttpServletRequest request){
        //userId 수정 필요
        return new ResponseEntity<>(cardService.searchCards(userId), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteCard(@RequestBody DeleteCardRequest deleteCardRequest, HttpServletRequest request){
        return new ResponseEntity<>(cardService.deleteCard(deleteCardRequest.getID()), userId());
    }
}
