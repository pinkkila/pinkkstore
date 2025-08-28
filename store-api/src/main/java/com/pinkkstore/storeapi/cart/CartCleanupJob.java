package com.pinkkstore.storeapi.cart;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Sync the cutoffTime with the login session time.
 * When a user's session is ended, the cart gets cleaned (removed).
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class CartCleanupJob {
    private final CartRepository cartRepository;
    
    @Scheduled(fixedDelay = 15 * 60 * 1000)
    public void cleanupAbandonedCarts() {
        LocalDateTime cutoffTime = LocalDateTime.now().minusMinutes(60);
        List<Cart> expiredCarts = cartRepository.findByLastModifiedBefore(cutoffTime);
        cartRepository.deleteAll(expiredCarts);
        
        for (Cart cart : expiredCarts) {
            log.info("Cleaned up abondened cart: {}", cart);
        }
    }
    
}
