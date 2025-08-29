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
    
    // This has been implemented to make the payment service work more "realistically".
    public boolean reduceCoins(Authentication authentication, double orderPrice) {
        var account = getAccountByAppUsername(authentication);
        
        var coinBalance = account.getCoins() - orderPrice;
        
        if (coinBalance > 0) {
            account.setCoins(coinBalance);
            accountRepository.save(account);
            return true;
        }
        return false;
    }
    
}
