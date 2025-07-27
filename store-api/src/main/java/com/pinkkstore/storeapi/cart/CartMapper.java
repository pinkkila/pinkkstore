package com.pinkkstore.storeapi.cart;

import com.pinkkstore.storeapi.product.Product;
import com.pinkkstore.storeapi.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CartMapper {
    private final ProductService productService;
    
//    public CartDto toCartDto(Cart cart) {
//        var items = cart.getCartItems().stream()
//                .map(item -> new CartDto.CartItemDto(item.getProductId(), item.getProductQty(), productService.isProductInStock(item.getProductId())))
//                .toList();
//        int totalQty = items.stream()
//                .mapToInt(CartDto.CartItemDto::productQty)
//                .sum();
//        return new CartDto(items, totalQty);
//    }
    
    
    public CartDto toCartDto(Cart cart) {
        List<Long> productIds = cart.getCartItems().stream()
                .map(CartItem::getProductId)
                .toList();
        
        Map<Long, Product> productMap = productService.getAllById(productIds).stream()
                .collect(Collectors.toMap(Product::getId, Function.identity()));
        
        var items = cart.getCartItems().stream()
                .map(item -> {
                    Product product = productMap.get(item.getProductId());
                    int availableQty = product.getStockQty() - product.getReservedQty();
                    return new CartDto.CartItemDto(
                            item.getProductId(),
                            item.getProductQty(),
                            availableQty >= item.getProductQty(),
                            availableQty
                    );
                })
                .toList();
        
        int totalQty = items.stream()
                .mapToInt(CartDto.CartItemDto::productQty)
                .sum();
        
        return new CartDto(items, totalQty);
    }
    
}
