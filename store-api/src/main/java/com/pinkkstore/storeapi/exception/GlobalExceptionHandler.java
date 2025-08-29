package com.pinkkstore.storeapi.exception;

import com.pinkkstore.storeapi.account.AccountNotFoundException;
import com.pinkkstore.storeapi.cart.CartNotFoundException;
import com.pinkkstore.storeapi.category.CategoryNotFoundException;
import com.pinkkstore.storeapi.order.OrderNotFoundException;
import com.pinkkstore.storeapi.payment.PaymentException;
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
    
    @ExceptionHandler(CartNotFoundException.class)
    public ResponseEntity<ApiException> handleCartNotFound(CartNotFoundException ex) {
        log.error(ex.getMessage());
        var exception = new ApiException(
                HttpStatus.NOT_FOUND.value(),
                "Cart not found.",
                "Service was not able to find the cart."
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception);
    }
    
    @ExceptionHandler(OrderNotFoundException.class)
    public ResponseEntity<ApiException> handleOrderNotFound(OrderNotFoundException ex) {
        log.error(ex.getMessage());
        var exception = new ApiException(
                HttpStatus.NOT_FOUND.value(),
                "Order not found.",
                "Service was not able to find the order."
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception);
    }
    
    @ExceptionHandler(CategoryNotFoundException.class)
    public ResponseEntity<ApiException> handleCategoryNotFound(CategoryNotFoundException ex) {
        var exception = new ApiException(
                HttpStatus.NOT_FOUND.value(),
                "Category not found.",
                ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception);
    }
    
    @ExceptionHandler(AccountNotFoundException.class)
    public ResponseEntity<ApiException> handleAccountNotFound(AccountNotFoundException ex) {
        log.error(ex.getMessage());
        var exception = new ApiException(
                HttpStatus.NOT_FOUND.value(),
                "Account not found.",
                "Service was not able to find the account."
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception);
    }
    
    
    @ExceptionHandler(PaymentException.class)
    public ResponseEntity<ApiException> handlePaymentException(PaymentException ex) {
        log.error(ex.getMessage());
        var exception = new ApiException(
                HttpStatus.BAD_REQUEST.value(),
                "Payment failed.",
                "The service failed to complete the payment."
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
