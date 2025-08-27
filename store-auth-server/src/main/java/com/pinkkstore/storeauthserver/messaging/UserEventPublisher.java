package com.pinkkstore.storeauthserver.messaging;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserEventPublisher {
    private final AmqpTemplate template;
    
    public void sendNewUsername(String username) {
        template.convertAndSend("username", username);
        log.info("New username sent: {}", username);
    }
}
