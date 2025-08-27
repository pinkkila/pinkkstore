package com.pinkkstore.storeapi.messaging;

import com.pinkkstore.storeapi.account.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.amqp.rabbit.annotation.RabbitListener;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserEventListener {
    private final AccountService accountService;
    
    @RabbitListener(queues = "username")
    public void listen(String username) {
        accountService.createAccount(username);
        log.info("Received new username: {}", username);
    }
    
}
