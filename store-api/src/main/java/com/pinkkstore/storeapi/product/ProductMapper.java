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
                product.getPrice(),
                product.getStockQty() - product.getReservedQty() > 0
        );
    }
    
    public ProductDetailsSmallDto toProductDetailsSmallDto(Product product) {
        return new ProductDetailsSmallDto(
                product.getId(),
                product.getProductName(),
                product.getImageUrl(),
                product.getPrice(),
                product.getStockQty() - product.getReservedQty() > 0
        );
    }
    
    public ProductCategoryNameDto toProductCategoryNameDto(Product product,  String categoryName) {
        var productDto = toProductDto(product);
        return new ProductCategoryNameDto(productDto, categoryName);
    }
    
}
