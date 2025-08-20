package com.pinkkstore.storeapi.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ProductRepository extends ListCrudRepository<Product, Long>, PagingAndSortingRepository<Product, Long> {
    Page<Product> findAllByCategoryId(Long categoryId, Pageable pageable);
    Page<Product> findAllByCategoryIdAndPriceBetween(Long categoryId, Double minPrice, Double maxPrice, Pageable pageable);
    Page<Product> findAllByPriceBetween(Double minPrice, Double maxPrice, Pageable pageable);
}
