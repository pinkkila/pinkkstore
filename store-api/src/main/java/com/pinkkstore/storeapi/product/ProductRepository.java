package com.pinkkstore.storeapi.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ProductRepository extends ListCrudRepository<Product, Long>, PagingAndSortingRepository<Product, Long> {
    Page<Product> findAllByCategoryId(Long categoryId, Pageable pageable);
}
