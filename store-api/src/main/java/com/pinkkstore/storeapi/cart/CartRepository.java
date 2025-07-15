package com.pinkkstore.storeapi.cart;

import org.springframework.data.repository.ListCrudRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface CartRepository extends ListCrudRepository<Cart, Long> {
    List<Cart> findByLastModifiedBefore(LocalDateTime cutoffTime);
    Optional<Cart> findByAppUsername(String appUsername);
}
