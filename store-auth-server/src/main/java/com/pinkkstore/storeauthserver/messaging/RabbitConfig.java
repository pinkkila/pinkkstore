package com.pinkkstore.storeauthserver.messaging;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.core.Queue;

@Configuration
public class RabbitConfig {
    
    @Bean
    public Queue usernameQueue() {
        return new Queue("username");
    }
    
}
