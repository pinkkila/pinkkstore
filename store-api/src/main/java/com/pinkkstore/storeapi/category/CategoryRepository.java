package com.pinkkstore.storeapi.category;

import org.springframework.data.repository.ListCrudRepository;

import java.util.Optional;

public interface CategoryRepository extends ListCrudRepository<Category, Long> {
    Optional<Category> findByCategoryName(String categoryName);
}
