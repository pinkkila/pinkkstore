package com.pinkkstore.storeapi.cart;

import org.springframework.data.repository.ListCrudRepository;

public interface CartRepository extends ListCrudRepository<Cart, Long> {
}
