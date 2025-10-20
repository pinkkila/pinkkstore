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
    
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
    }
    
    public List<Product> getAllById(List<Long> productIds) {
        return productRepository.findAllById(productIds);
    }
    
    // Use this only with the products/{id} (categoryName is needed for breadcrumps).
    public ProductCategoryNameDto getProductCategoryNameDto(Long productId) {
        var product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));
        var categoryName = categoryService.getCategoryById(product.getCategoryId()).getCategoryName();
        return productMapper.toProductCategoryNameDto(product, categoryName);
    }
    
    public Page<ProductDto> getProductsDtoWithFilters(String categoryName, Double minPrice, Double maxPrice, Pageable pageable) {
        if (categoryName != null && minPrice != null && maxPrice != null) {
            var category = categoryService.getCategoryByName(categoryName);
            return productRepository.findAllByCategoryIdAndPriceBetween(category.getId(), minPrice, maxPrice, pageable)
                    .map(productMapper::toProductDto);
        } else if (categoryName != null) {
            var category = categoryService.getCategoryByName(categoryName);
            return productRepository.findAllByCategoryId(category.getId(), pageable)
                    .map(productMapper::toProductDto);
        } else if (minPrice != null && maxPrice != null) {
            return productRepository.findAllByPriceBetween(minPrice, maxPrice, pageable)
                    .map(productMapper::toProductDto);
        }
        return productRepository.findAll(pageable)
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
