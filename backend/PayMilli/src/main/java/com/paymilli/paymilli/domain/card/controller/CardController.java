package com.paymilli.paymilli.domain.card.controller;


import com.paymilli.paymilli.domain.card.dto.request.AddCardRequest;
import com.paymilli.paymilli.domain.card.service.CardService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/board")
public class CardController {

    private final CardService cardService;
    private final webCl
    public CardController(CardService cardService){
        this.cardService = cardService;
    }

    @PostMapping
    public ResponseEntity<?> addCard(@RequestBody AddCardRequest addCardRequest){
        if(!cardService.isPresent(addCardRequest))
            return ResponseEntity.notFound();
        if(!cardService.isAleadyRegister(cardService.getId()))
            return ResponseEntity.badRequest();
        if(!cardService.)
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
