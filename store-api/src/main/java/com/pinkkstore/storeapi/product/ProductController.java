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
    public ResponseEntity<ProductDto> getProduct(@PathVariable Long requestedId) {
        return ResponseEntity.ok(this.productService.getProductDto(requestedId));
    }
    
//    @GetMapping
//    public ResponseEntity<List<ProductDto>> findAll() {
//        return ResponseEntity.ok(this.productService.getAllProducts());
//    }
    
//    @GetMapping
//    public ResponseEntity<List<Product>> findAllPage(Pageable pageable) {
//        Page<Product> page = productRepository.findAll(
//                PageRequest.of(
//                        pageable.getPageNumber(),
//                        pageable.getPageSize()
//                ));
//        return ResponseEntity.ok(page.getContent());
//    }
    
    @GetMapping("/categories/{categoryName}")
    public ResponseEntity<Page<ProductDto>> findAllByCategoryName(@PathVariable String categoryName, Pageable pageable) {
        return ResponseEntity.ok(this.productService.getProductsDtoByCategoryName(categoryName, pageable));
    }
    
    @GetMapping("/categories/{categoryName}/price-range")
    public ResponseEntity<Page<ProductDto>> findAllByCategoryNameWithPrice(@PathVariable String categoryName, @RequestParam double minPrice, @RequestParam double maxPrice, Pageable pageable) {
        return ResponseEntity.ok(this.productService.getProductsDtoByCategoryNameAndPriceRange(categoryName, minPrice, maxPrice, pageable));
    }
        
    @GetMapping("/details/{requestedId}")
    public ResponseEntity<ProductDetailsSmallDto> getProductDetails(@PathVariable Long requestedId) {
        return ResponseEntity.ok(this.productService.getProductDetailsSmallDto(requestedId));
    }
    
}
