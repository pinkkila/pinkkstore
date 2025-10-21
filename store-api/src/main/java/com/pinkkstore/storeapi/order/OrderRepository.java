package com.pinkkstore.storeapi.order;

import org.springframework.data.repository.ListCrudRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends ListCrudRepository<Order, Long> {
    List<Order> findAllByAccountId(Long accountId);
    Optional<Order> findByIdAndAccountId(Long id, Long accountId);
}
