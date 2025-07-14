package com.pinkkstore.storeapi.cart;

import com.pinkkstore.storeapi.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final ProductService productService;
    
    @Transactional
    public Cart createNewCart(NewCartRequest newCartRequest, Authentication authentication) {
        productService.increaseReservedQty(newCartRequest.productId(), newCartRequest.productQty());
        
        // add mapper later? cartDto with price?
        var newCartRow = new CartRow(null, newCartRequest.productQty(), newCartRequest.productId());
        var newCart = new Cart(null, authentication.getName(), LocalDateTime.now(), Set.of(newCartRow));
        
        return cartRepository.save(newCart);
    }
    
}
