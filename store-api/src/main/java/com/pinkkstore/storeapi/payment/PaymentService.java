package com.pinkkstore.storeapi.payment;

import com.pinkkstore.storeapi.account.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final AccountService accountService;
    
    public Payment pay(Authentication authentication, double orderPrice) {
        var accountCoinsReduced = accountService.reduceCoins(authentication, orderPrice);
        if (accountCoinsReduced) {
            return paymentRepository.save(new Payment(null, orderPrice));
        } else {
            throw new PaymentException(authentication);
        }
        
    }
    
    
}
