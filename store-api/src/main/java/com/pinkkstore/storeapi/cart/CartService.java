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
        var newCartRow = new CartRow(null, cartRequest.productQty(), cartRequest.productId());
        var newCart = new Cart(null, authentication.getName(), LocalDateTime.now(), Set.of(newCartRow));
        
        return cartRepository.save(newCart);
    }
    
    @Transactional
    public Cart updateCart(Long cartId, CartRequest cartRequest, Authentication authentication) {
        var cart  = cartRepository.findByIdAndAppUsername(cartId, authentication.getName())
                .orElseThrow(() ->  new CartNotFoundException(cartId, authentication));
        
        productService.changeReservedQty(cartRequest.productId(), cartRequest.productQty());
        
        var existingRow = cart.getCartRows().stream()
                .filter(row -> row.getProductId().equals(cartRequest.productId()))
                .findFirst();
        
        if (existingRow.isPresent()) {
            var row = existingRow.get();
            int newQty = row.getProductQty() + cartRequest.productQty();
            
            if (newQty > 0) {
                row.setProductQty(newQty);
            } else {
                cart.getCartRows().remove(row);
            }
            
        } else {
            if (cartRequest.productQty() > 0) {
                var newRow = new CartRow(null, cartRequest.productQty(), cartRequest.productId());
                cart.getCartRows().add(newRow);
            }
        }
        
        cart.setLastModified(LocalDateTime.now());
        
        return cartRepository.save(cart);
    }
    
}
