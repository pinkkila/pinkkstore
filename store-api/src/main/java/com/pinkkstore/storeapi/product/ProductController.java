package com.pinkkstore.storeapi.product;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;
    
    @GetMapping("/{requestedId}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable Long requestedId) {
        return ResponseEntity.ok(this.productService.getProductDto(requestedId));
    }
    
    @GetMapping
    public ResponseEntity<List<ProductDto>> findAll() {
        return ResponseEntity.ok(this.productService.getAllProducts());
    }
    
    @GetMapping("/categories/{categoryName}")
    public ResponseEntity<List<ProductDto>> findAllByCategoryName(@PathVariable String categoryName) {
        return ResponseEntity.ok(this.productService.getAllProductsDtoByCategoryName(categoryName));
    }
    
    
}
