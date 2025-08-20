package com.pinkkstore.storeapi.product;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;
    
    @GetMapping("/{requestedId}")
    public ResponseEntity<ProductCategoryNameDto> getProduct(@PathVariable Long requestedId) {
        return ResponseEntity.ok(this.productService.getProductCategoryNameDto(requestedId));
    }
    
    @GetMapping
    public ResponseEntity<Page<ProductDto>> getProducts(
            @RequestParam(required = false) String categoryName,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            Pageable pageable) {
        return ResponseEntity.ok(this.productService.getProductsDtoWithFilters(categoryName, minPrice, maxPrice, pageable));
    }
    
    @GetMapping("/details/{requestedId}")
    public ResponseEntity<ProductDetailsSmallDto> getProductDetails(@PathVariable Long requestedId) {
        return ResponseEntity.ok(this.productService.getProductDetailsSmallDto(requestedId));
    }
    
}
