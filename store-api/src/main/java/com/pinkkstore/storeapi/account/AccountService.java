package com.pinkkstore.storeapi.account;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;
    
    public Account getAccountByAppUsername(Authentication authentication) {
        return accountRepository.findByAppUsername(authentication.getName())
                .orElseThrow(()  -> new AccountNotFoundException(authentication));
    }
    
    public void createAccount(String appUsername) {
        accountRepository.save(new Account(null, appUsername, 100.00));
    }
    
}
