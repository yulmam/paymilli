package com.paymilli.paymilli.domain.card.controller;


import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/board")
public class CardController {

    private final CardService cardService;
    public CardController(CardService cardService){
        this.cardService = cardService;
    }

    @PostMapping
    public ResponseEntity<?> addCard(@RequestBody AddCardRequest addCardRequest){
        return ResponseEntity.ok();
    }


    @GetMapping
    public ResponseEntity<?> searchCards(HttpServletRequest request){
        return ResponseEntity.ok();
    }

    @DeleteMapping
    public ResponseEntity<?> deleteCard(@RequestBody RemoveCardRequest removeCardRequest, HttpServletRequest request){
        return ResponseEntity.ok();
    }
}
