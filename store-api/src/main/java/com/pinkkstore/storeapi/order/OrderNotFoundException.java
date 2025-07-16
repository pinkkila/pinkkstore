package com.pinkkstore.storeapi.order;

import org.springframework.security.core.Authentication;

public class OrderNotFoundException extends RuntimeException {
    public OrderNotFoundException(Authentication authentication) {
        super("User: " + authentication.getName() + " failed to find order.");
    }
}
