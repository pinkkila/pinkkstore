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
    
    public Cart getCart(Authentication authentication) {
        return cartRepository.findByAppUsername(authentication.getName())
                .orElseGet(() -> {
                    var cart = new Cart(null, authentication.getName(), LocalDateTime.now(), Set.of());
                    return cartRepository.save(cart);
                });
    }
    
    @Transactional
    public Cart updateCart(CartRequest cartRequest, Authentication authentication) {
        var cart = cartRepository.findByAppUsername(authentication.getName())
                .orElseThrow(() -> new CartNotFoundException(authentication));
        
        productService.changeReservedQty(cartRequest.productId(), cartRequest.productQty());
        
        var existingCartItem = cart.getCartItems().stream()
                .filter(item -> item.getProductId().equals(cartRequest.productId()))
                .findFirst();
        
        if (existingCartItem.isPresent()) {
            var item = existingCartItem.get();
            int newQty = item.getProductQty() + cartRequest.productQty();
            
            if (newQty > 0) {
                item.setProductQty(newQty);
            } else {
                cart.getCartItems().remove(item);
            }
            
        } else {
            if (cartRequest.productQty() > 0) {
                var newItem = new CartItem(null, cartRequest.productQty(), cartRequest.productId());
                cart.getCartItems().add(newItem);
            }
        }
        
        cart.setLastModified(LocalDateTime.now());
        
        return cartRepository.save(cart);
    }
    
}
