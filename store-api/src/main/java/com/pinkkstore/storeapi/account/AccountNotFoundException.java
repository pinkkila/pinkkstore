package com.pinkkstore.storeapi.account;

import org.springframework.security.core.Authentication;

public class AccountNotFoundException extends RuntimeException {
    public AccountNotFoundException(Authentication authentication) {
      // TODO change .getName() to id.
      super("User: " + authentication.getName() + " failed to find account.");
      
    }
}
