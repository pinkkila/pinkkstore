package com.pinkkstore.storeapi.product;

import com.pinkkstore.storeapi.category.CategoryRepository;
import com.pinkkstore.storeapi.category.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final CategoryService categoryService;
    
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
        
        if (newReserved < 0) {
            log.warn("Reserved quantity went below zero for product ID {}. Adjusting to 0. Change attempted: {}. Reserved was {}", productId, reservedQty, product.getReservedQty());
            newReserved = 0;
        }
        
        product.setReservedQty(newReserved);
        productRepository.save(product);
    }
    
    public Page<ProductDto> getAllProductsDtoByCategoryName(String categoryName, Pageable pageable) {
         var category = categoryService.getCategoryByName(categoryName);
         return productRepository.findAllByCategoryId(category.getId(), pageable)
                 .map(productMapper::toProductDto);
        
    }
    
    public ProductDetailsSmallDto getProductDetailsSmallDto(Long productId) {
        return productRepository.findById(productId)
                .map(productMapper::toProductDetailsSmallDto)
                .orElseThrow(() -> new ProductNotFoundException(productId));
    }
    
}
