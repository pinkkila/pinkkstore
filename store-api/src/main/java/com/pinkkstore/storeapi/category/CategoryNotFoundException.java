package com.pinkkstore.storeapi.category;

public class CategoryNotFoundException extends RuntimeException {
    public CategoryNotFoundException(String categoryName) {
        super("Category " + categoryName + " not found");
    }
}
