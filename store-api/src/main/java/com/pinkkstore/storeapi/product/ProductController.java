package com.pinkkstore.storeapi.product;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;
    private final ProductRepository productRepository;
    
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
        return ResponseEntity.ok(this.productService.getAllProductsDtoByCategoryName(categoryName, pageable));
    }
    
    @GetMapping("/details/{requestedId}")
    public ResponseEntity<ProductDetailsSmallDto> getProductDetails(@PathVariable Long requestedId) {
        return ResponseEntity.ok(this.productService.getProductDetailsSmallDto(requestedId));
    }
    
}
