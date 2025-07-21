package com.pinkkstore.storeapi.product;

import org.springframework.stereotype.Component;

@Component
public class ProductMapper {
    
    public ProductDto toProductDto(Product product) {
        return new ProductDto(
                product.getId(),
                product.getProductName(),
                product.getProductDesc(),
                product.getImageUrl(),
                product.getPrice()
        );
    }
    
    public ProductDetailsSmallDto toProductDetailsSmallDto(Product product) {
        return new ProductDetailsSmallDto(
                product.getProductName(),
                product.getImageUrl(),
                product.getPrice(),
                product.getStockQty() - product.getReservedQty() > 0
        );
    }
}
