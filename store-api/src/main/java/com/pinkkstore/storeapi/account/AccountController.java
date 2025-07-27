package com.pinkkstore.storeapi.account;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/accounts")
public class AccountController {
    private final AccountService accountService;
    
    @GetMapping
    public ResponseEntity<Account> getAccount(Authentication authentication) {
        return ResponseEntity.ok(accountService.getAccountByAppUsername(authentication));
    }
    
    
    
}
