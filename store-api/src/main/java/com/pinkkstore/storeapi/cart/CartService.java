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
    private final CartMapper cartMapper;
    
    public CartDto getCartDto(Authentication authentication) {
        return cartRepository.findByAppUsername(authentication.getName())
                .map(cartMapper::toCartDto)
                .orElseGet(() -> {
                    var cart = new Cart(null, authentication.getName(), LocalDateTime.now(), Set.of());
                    var savedCart = cartRepository.save(cart);
                    return cartMapper.toCartDto(savedCart);
                });
    }
    
    @Transactional
    public CartDto updateCart(CartRequest cartRequest, Authentication authentication) {
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
            
        } else if (cartRequest.productQty() > 0) {
            cart.getCartItems().add(new CartItem(null, cartRequest.productQty(), cartRequest.productId()));
        }
        
        cart.setLastModified(LocalDateTime.now());
        
        var savedCart = cartRepository.save(cart);
        return cartMapper.toCartDto(savedCart);
    }
    
}
