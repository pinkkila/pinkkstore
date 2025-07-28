package com.pinkkstore.storeapi.product;

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
    
    public Product getById(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));
    }
    
    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(productMapper::toProductDto)
                .collect(Collectors.toList());
    }
    
    public List<Product> getAllById(List<Long> productIds) {
        return productRepository.findAllById(productIds);
    }
    
    public ProductDto getProductDto(Long productId) {
        return productRepository.findById(productId)
                .map(productMapper::toProductDto)
                .orElseThrow(() -> new ProductNotFoundException(productId));
    }
    
    public Page<ProductDto> getProductsDtoByCategoryName(String categoryName, Pageable pageable) {
        var category = categoryService.getCategoryByName(categoryName);
        return productRepository.findAllByCategoryId(category.getId(), pageable)
                .map(productMapper::toProductDto);
    }
    
    public Page<ProductDto> getProductsDtoByCategoryNameAndPriceRange(String categoryName, double minPrice, double maxPrice, Pageable pageable) {
        var category = categoryService.getCategoryByName(categoryName);
        return productRepository.findAllByCategoryIdAndPriceBetween(category.getId(), minPrice, maxPrice, pageable)
                .map(productMapper::toProductDto);
    }
    
    // TODO: Does this need inStock (already in cart)
    public ProductDetailsSmallDto getProductDetailsSmallDto(Long productId) {
        return productRepository.findById(productId)
                .map(productMapper::toProductDetailsSmallDto)
                .orElseThrow(() -> new ProductNotFoundException(productId));
    }
    
    public void assertProductAvailability(Long productId, int quantity) {
        var product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));
        
        var availability = product.getStockQty() - product.getReservedQty();
        if (availability < quantity) {
            throw new ProductNotEnoughStockException(productId);
        }
    }

//    public boolean isProductInStock(Long productId) {
//        var product = productRepository.findById(productId)
//                .orElseThrow(() -> new ProductNotFoundException(productId));
//
//        var availability = product.getStockQty() - product.getReservedQty();
//        return availability > 0;
//    }
    
    public Product reduceStockQty(Long productId, int stockReduction) {
        var product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));
        
        var availability = product.getStockQty() - product.getReservedQty();
        if (availability < stockReduction) {
            throw new ProductNotEnoughStockException(productId);
        }
        
        product.setStockQty(product.getStockQty() - stockReduction);
        return productRepository.save(product);
    }
    
}
