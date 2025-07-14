package com.pinkkstore.storeapi.exception;

import com.pinkkstore.storeapi.product.ProductNotFoundException;
import com.pinkkstore.storeapi.product.ProductNotEnoughStockException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ApiException> handleProductNotFound(ProductNotFoundException ex) {
        var exception = new ApiException(
                HttpStatus.NOT_FOUND.value(),
                "Product Not Found",
                ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception);
    }
    
    @ExceptionHandler(ProductNotEnoughStockException.class)
    public ResponseEntity<ApiException> handleProductOutOfStock(ProductNotEnoughStockException ex) {
        var exception = new ApiException(
                HttpStatus.BAD_REQUEST.value(),
                "Product is out of stock or there is not enough stock",
                ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiException> handleGenericException(Exception ex) {
        log.error("Unexpected error occurred", ex);
        var error = new ApiException(500, "Internal Server Error", "An unexpected error occurred. Please try again later.");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
