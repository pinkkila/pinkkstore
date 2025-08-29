package com.pinkkstore.storeapi.payment;

import org.springframework.security.core.Authentication;

public class PaymentException extends RuntimeException {
    public PaymentException(Authentication authentication) {
      // TODO change .getName() to id.
      super("Payment failed with user: " + authentication.getName());
    }
}
