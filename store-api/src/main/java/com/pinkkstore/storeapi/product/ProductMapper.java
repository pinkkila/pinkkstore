package com.pinkkstore.storeapi.product;

import org.springframework.stereotype.Component;

@Component
public class ProductMapper {
    
    public ProductDto toProductDto(Product product) {
        return new ProductDto(
                product.getId(),
                product.getProductName(),
                product.getProductDesc(),
                product.getPrice()
        );
    }
}
