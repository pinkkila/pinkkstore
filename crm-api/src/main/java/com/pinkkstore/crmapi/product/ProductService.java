package com.pinkkstore.crmapi.product;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    public void changeReservedQty(Long productId, int reservedQty) {
        var product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));
        
        int newReserved = product.getReservedQty() + reservedQty;
        
        if (product.getStockQty() < newReserved) {
            throw new ProductNotEnoughStockException(productId);
        }
        
        if (newReserved < 0) {
            log.warn("Reserved quantity went below zero for product ID {}. Adjusting to 0. Change attempted: {}. Reserved was {}", productId, reservedQty, product.getReservedQty());
            newReserved = 0;
        }
        
        product.setReservedQty(newReserved);
        productRepository.save(product);
    }
}
