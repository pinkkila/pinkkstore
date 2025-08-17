package com.pinkkstore.storeapi.category;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    
    public Category getCategoryByName(String categoryName) {
       return categoryRepository.findByCategoryName(categoryName)
               .orElseThrow(() -> new CategoryNotFoundException(categoryName));
    }
    
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));
    }
}
