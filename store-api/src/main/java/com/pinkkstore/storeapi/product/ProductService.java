package com.pinkkstore.storeapi.product;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    
    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(productMapper::toProductDto)
                .collect(Collectors.toList());
    }
    
    public ProductDto getProductDto(Long productId) {
        return productRepository.findById(productId)
                .map(productMapper::toProductDto)
                .orElseThrow(() -> new ProductNotFoundException(productId));
    }
    
    public void changeReservedQty(Long productId, int reservedQty) {
        var product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));
        
        int newReserved = product.getReservedQty() + reservedQty;
        
        if (product.getStockQty() < newReserved) {
            throw new ProductNotEnoughStockException(productId);
        }
        
        product.setReservedQty(newReserved);
        productRepository.save(product);
    }
    
}
