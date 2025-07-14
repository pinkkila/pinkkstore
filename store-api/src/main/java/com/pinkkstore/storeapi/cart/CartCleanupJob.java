package com.pinkkstore.storeapi.cart;

import com.pinkkstore.storeapi.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class CartCleanupJob {
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    
    
    @Transactional
    @Scheduled(fixedDelay = 15 * 60 * 1000) // every 15 minutes
//    @Scheduled(fixedDelay = 2 * 60 * 1000) // every 2 minutes
    public void cleanupAbandonedCarts() {
        LocalDateTime cutoff = LocalDateTime.now().minusMinutes(60);
//        LocalDateTime cutoff = LocalDateTime.now().minusMinutes(3);
        List<Cart> expiredCarts = cartRepository.findByLastModifiedBefore(cutoff);
        
        for (Cart cart : expiredCarts) {
            for (CartRow row : cart.getCartRows()) {
                productRepository.findById(row.getProductId()).ifPresent(product -> {
                    product.setReservedQty(product.getReservedQty() - row.getProductQty());
                    productRepository.save(product);
                });
            }
            
            cartRepository.delete(cart);
        }
        
        if (!expiredCarts.isEmpty()) {
            log.info("Cleaned up {} abandoned carts%n", expiredCarts.size());
        }
    }
    
    
}
