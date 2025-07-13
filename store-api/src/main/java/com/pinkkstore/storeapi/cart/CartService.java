package com.pinkkstore.storeapi.cart;

import com.pinkkstore.storeapi.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    
    public Cart createNewCart(NewCartRequest newCartRequest, Authentication authentication) {
        
        var productOptional = productRepository.findById(newCartRequest.productId());
        if (productOptional.isPresent()) {
            var product = productOptional.get();
            product.setReservedQty(product.getReservedQty() + newCartRequest.productQty());
            productRepository.save(product);
        }
        
        var newCartRow = new CartRow(null, newCartRequest.productQty(), newCartRequest.productId());
        var newCart = new Cart(null, authentication.getName(), LocalDateTime.now(), Set.of(newCartRow));
        
        
        
        return cartRepository.save(newCart);
    }
    
}
