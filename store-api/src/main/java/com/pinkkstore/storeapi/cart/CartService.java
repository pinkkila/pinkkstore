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
    public Cart createNewCart(CartRequest cartRequest, Authentication authentication) {
        productService.changeReservedQty(cartRequest.productId(), cartRequest.productQty());
        
        // add mapper later? cartDto with price?
        var newCartItem = new CartItem(null, cartRequest.productQty(), cartRequest.productId());
        var newCart = new Cart(null, authentication.getName(), LocalDateTime.now(), Set.of(newCartItem));
        
        return cartRepository.save(newCart);
    }
    
    @Transactional
    public Cart updateCart(Long cartId, CartRequest cartRequest, Authentication authentication) {
        var cart  = cartRepository.findByIdAndAppUsername(cartId, authentication.getName())
                .orElseThrow(() ->  new CartNotFoundException(cartId, authentication));
        
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
