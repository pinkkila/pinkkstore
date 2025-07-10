package com.pinkkstore.storeapi.product;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;
    
    @GetMapping
    private ResponseEntity<List<ProductDto>> findAll() {
        return ResponseEntity.ok(this.productService.getAllProducts());
    }
}
